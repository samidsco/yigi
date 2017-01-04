import * as React from 'react'
import * as ReactHelmet from "react-helmet"
import HelmetData = ReactHelmet.HelmetData


const GoogleAnalytics = ({id}) => (
    <script
        dangerouslySetInnerHTML={{ __html: `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', '${id}', 'auto'); ga('send', 'pageview');`,
    }}
    />
);

/*GoogleAnalytics.propTypes = {
 id: React.PropTypes.string.isRequired,
 };*/

interface Props {
    appCssFilename: string,
    bodyCss: string,
    bodyHtml: string,
    googleAnalyticsId: string,
    helmet: HelmetData,
    isProduction: boolean,
}
;

class Html extends React.Component<Props, {}> {
    render() {
        const {helmet, appCssFilename, isProduction, googleAnalyticsId, bodyCss, bodyHtml} = this.props;
        return (
            <html {...helmet.htmlAttributes.toComponent()}>
            <head>
                {helmet.title.toComponent()}
                {helmet.base.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}
                {appCssFilename &&
                <link href={appCssFilename} rel="stylesheet"/>
                }
                {isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
                <GoogleAnalytics id={googleAnalyticsId}/>
                }
                <style dangerouslySetInnerHTML={{ __html: bodyCss }} id="stylesheet"/>
            </head>
            <body dangerouslySetInnerHTML={{ __html: bodyHtml }}/>
            </html>
        )
    }
}

export default Html;
