Redactor Styles for Craft
===========

This plugin was a Craft wrapper for the [Styles Redactor plugin by JP Devries](https://github.com/jpdevries/styles). 
It is now reworked to work with the new Redactor 10 API and Craft 2.3+.


Usage
---
Download the code and put it in a folder named redactorstyles in your craft plugins folder. Go to Settings > Plugins 
and install it. You can now click on the plugin name to enter the settings.

In the settings you can add content to two fields, "Styles JSON Object" and "Styles CSS". The JSON object is an array 
with the different styles you want to add. It may look something like this:

    [
        { 
            "btnName":"Blue text", 
            "className":"blue-text", 
            "spanClass":"blue-text", 
        },
        { 
            "btnName":"Indented Text", 
            "className":"indented-text", 
            "spanClass":"indented-text",
            "forceBlock": 1
        },
        { 
            "btnName":"Code block", 
            "className":"code", 
            "spanClass":"code",
            "wrap":"code",
            "forceBlock": 1
        }
    ]

Se available options below. **If you want inline styles using span (like the first style above), you need to turn off the 
"Clean up HTML?" option for the field in Craft.**  

In the CSS field you set up any CSS you need to customize the redactor fields in the 
control panel. Could be somthing like this:

    .redactor-dropdown .redactor-dropdown-blue-text,
    .redactor-editor .blue-text { color: #8acfdd; }
    
    .redactor-dropdown .redactor-dropdown-indented-text, 
    .redactor-editor .indented-text { text-indent: 3em; }

    .redactor-dropdown .redactor-dropdown-code,
    .redactor-editor .code { color: #999; font-family: monospace; }
    .redactor-editor .code { display: block; }
    
You can alternatively specify an external file for your CSS in the 'Styles CSS File' input field. This needs to be a public path above your web root, so `/css/redactorStyles.css` for example. You can also use `{siteUrl}css/redactorStyles.css` if you are using Craft's [Environment-Specific Variables](http://buildwithcraft.com/docs/multi-environment-configs#environment-specific-variables).

This CSS will be added to the control panel, so you can basicly restyle anything by putting in the necessary styles 
here. Staying within the Redactor area, here's how to add more bottom margin to the p tag, and add some other styling 
to the h3 tag.
 
    .redactor-box .redactor_editor p { margin-bottom: 16px !important; }
    
    .redactor-box .redactor_editor h3, 
    .redactor-dropdown .redactor-format-h3 { 
        font-size: 14px !important; 
        color: #8acfdd !important; 
        margin-bottom: 0 !important; 
    }

As you can see, you have to use !important alot. :)

The last ting you need to do is enable the styles plugin in the Redactor configuration and hook in the configuration. 
Here's an example (could be myredactor.json in /craft/config/redactor):

    {
	      buttons: ['formatting','italic','unorderedlist','orderedlist','link','table','html'],
        formatting: ['p', 'h3'],
	      plugins: ['fullscreen', 'styles'],
	      toolbarFixed: true,
        stylesJson: RedactorStyles.stylesJson
    }


That's about it.
 
 
### Options:

**btnName**: The unique name of the custom format. Required.

**className**: A CSS classname to assign to the associated option in the dropdown. Used to style how the option appears. Required.

**spanClass**: A class to be applied to the selection. Will be wrapped in a span tag.

**style**: Inline CSS to be applied to the selection. 

**wrap**: HTML tag to wrap the selection in.

**forceBlock**: Set to 1 to force this to be a block object.



Todo/plans
---
- Add the ability to configure the styles JSON and CSS in the config files



Changelog
---
### Version 0.3
 - Rewrote plugin to use the Redactor 10 API for Craft 2.3+ support. The plugin now requires Craft 2.3 or newer.
 - Changed the defaults slightly, forceBlock is now either on or off, no auto. 
 - The remove format option now works, and remove all formatting from the caret to the bottom block element. 
 - The classnames in Redactor has changed, updated example CSS.
 
 
### Version 0.2
 - Add ability to use an external css file.
 
---
### Version 0.1
 - Initial public release
