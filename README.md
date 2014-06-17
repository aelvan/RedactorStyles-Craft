Redactor Styles for Craft
===========

This plugin is a Craft wrapper for the [Styles Redactor plugin by JP Devries](https://github.com/jpdevries/styles).


Usage
---
Download the code and put it in a folder named redactorstyles in your craft plugins folder. Go to Settings > Plugins 
and install it. You can now click on the plugin name to enter the settings.

In the settings you can add content to two fields, "Styles JSON Object" and "Styles CSS". The JSON object is an array 
with the different styles you want to add. It may look something like this:

    [
        { 
        "btnName":"Blue text", 
        "className":"redactor-blue-text", 
        "spanClass":"blue-text", 
        "forceBlock": "-1"
        },
        { 
        "btnName":"Indented Text", 
        "className":"redactor-indented-text", 
        "wrap":"p", 
        "spanClass":"indented-text" 
        }
    ]

Se available options below. If you want inline styles using span (like the first style above), you need to turn off the 
"Clean up HTML?" option for the field.  

In the CSS field you set up any CSS you need to customize the redactor fields in the 
control panel. Could be somthing like this:
 
    .redactor_dropdown .redactor-blue-text,
    .redactor_editor .blue-text { color: #8acfdd; }
    
    .redactor_dropdown .redactor-indented-text, 
    .redactor_editor .indented-text { text-indent: 3em; }

This CSS will be added to the control panel, so you can basicly restyle anything by putting in the necessary styles 
here. Staying within the Redactor area, here's how to add more bottom margin to the p tag, and add some other styling 
to the h3 tag.
 
    .redactor_box .redactor_editor p { margin-bottom: 16px !important; }
    
    .redactor_box .redactor_editor h3, 
    .redactor_dropdown .redactor_format_h3 { 
        font-size: 14px !important; 
        color: #8acfdd !important; 
        margin-bottom: 0 !important; 
    }

As you can see, you have to use !important alot. :)

The last ting you need to do is enable the styles plugin in the Redactor configuration and hook in the configuration. 
Here's an example (could be myredactor.json in /craft/config/redactor):

    {
	      buttons: ['formatting','italic','unorderedlist','orderedlist','link','table','html'],
        formattingTags: ['p', 'h3'],
	      plugins: ['fullscreen', 'styles'],
	      toolbarFixedBox: true,
        stylesJson: RedactorStyles.stylesJson
    }


That's about it.
 
 
### Options (from [here](https://www.modmore.com/extras/redactor/documentation/creating-custom-formats/#format-options)):

**btnName**: The unique name of the custom format. Required.

**className**: A CSS classname to assign to the associated option in the toolbar. Use to style how the option appears.

**spanClass**: A class to be applied to the selection. Will be wrapped in a span tag. Must be set if neither wrap or style is set.

**style**: Inline CSS to be applied to the selection. Must be set if neither spanClass or wrap is set.

**wrap**: HTML tag to wrap the selection in. Must be set if neither spanClass or style is set.

**forceBlock**: Set to 1,0, or -1 to control whether block or inline wrapping is applied. Defaults to 0. 0 auto determines based on wrap tag. 1 forces block level wrapping. -1 prevents block level wrapping.



Known issues
---
- It seems like the remove formatting option doesn't work that well on inline tags. If someone wants to look into it that, I'd be more than happy. :) 


Todo/plans
---
- Add the ability to configure the styles JSON and CSS in the config files



Changelog
---
### Version 0.1
 - Initial public release