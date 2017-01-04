// Super simple sync / async validation based on chriso/validator.js
import ValidationError from './ValidationError'
import * as validator from 'validator'
import * as Promise from 'bluebird'

// Subclass to add custom validations.
class Validation {

    object: Object;
    currentProp: string;
    validator: ValidatorJS.ValidatorStatic;
    promise: Promise<any>;

    // JSON to be validated.
    constructor(object) {
        this.object = object;
        this.currentProp = null;
        this.validator = validator;
        this.promise = Promise.resolve();
    }

    validate(callback, {required} = {required: false}) {
        const prop = this.currentProp;
        const value = this.object[prop];
        const object = this.object;
        this.promise = this.promise.then(() => {
            if (required && !this.isEmptyString(value)) { return; }
            callback(value, prop, object);
        });
        return this;
    }

    isEmptyString(value) {
        return !this.validator.toString(value).trim();
    }

    prop(prop) {
        this.currentProp = prop;
        return this;
    }

    required() {
        return this.validate((value, prop) => {
            throw new ValidationError('required', {prop});
        }, {required: true});
    }

    email() {
        return this.validate((value, prop) => {
            if (this.validator.isEmail(value)) { return; }
            throw new ValidationError('email', {prop});
        });
    }

    simplePassword() {
        return this.validate((value, prop) => {
            // Password must be at least 6 characters.
            const minLength = 6;
            if (value.length >= minLength) { return; }
            throw new ValidationError('simplePassword', {prop, minLength});
        });
    }

}

export default Validation;
