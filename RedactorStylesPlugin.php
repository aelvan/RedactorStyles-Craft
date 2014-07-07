<?php
namespace Craft;

/**
 * Redactor Styles plugin
 * 
 * 
 * @author André Elvan
 */
class RedactorStylesPlugin extends BasePlugin
{
	public function getName()
	{
		return 'Redactor Styles';
	}

	public function getVersion()
	{
		return '0.2';
	}

	public function getDeveloper()
	{
		return 'André Elvan';
	}

	public function getDeveloperUrl()
	{
		return 'http://vaersaagod.no';
	}

	public function init()
	{
		if (craft()->request->isCpRequest())
		{
      $settings = $this->getSettings();
      
      $stylesJson = $settings['redactorStylesJson'];

      if ($stylesJson!='') {
			  craft()->templates->includeJs('var RedactorStyles = {}; RedactorStyles.stylesJson = ' . $stylesJson . ';');
      }
      
      $stylesCss = $settings['redactorStylesCss'];
      if ($stylesCss!='') {
			  craft()->templates->includeCss($stylesCss);
      }
	  
	  if (trim($settings->redactorStylesCssFile)) {
            $filepath = craft()->config->parseEnvironmentString($settings->redactorStylesCssFile);
            craft()->templates->includeCssFile($filepath);
        }
      
			craft()->templates->includeCssResource('redactorstyles/styles.css');
			craft()->templates->includeJsResource('redactorstyles/styles.js');
		}
	}

	protected function defineSettings()
	{
    return array(
       'redactorStylesJson' => array(AttributeType::String, 'default' => ''),
       'redactorStylesCss' => array(AttributeType::String, 'default' => ''),
	   'redactorStylesCssFile' => array(AttributeType::String, 'default' => ''),
    );
	}
  
  public function getSettingsHtml()
  {
    $config_settings = array();
    $config_settings['redactorStylesJson'] = craft()->config->get('redactorStylesJson');
    $config_settings['redactorStylesCss'] = craft()->config->get('redactorStylesCss');
	$config_settings['redactorStylesCssFile'] = craft()->config->get('redactorStylesCssFile');
    
    return craft()->templates->render('redactorstyles/settings', array(
      'settings' => $this->getSettings()
    ));
  }
  
}
