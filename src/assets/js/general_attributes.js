function addGeneralAttribute(settings, name) {
	if (typeof settings.attributes !== 'undefined') {
		//Hide on mobile
		settings.attributes = Object.assign(settings.attributes, {
            hideOnMobile: {
                type: 'boolean',
            }
        });
		//Hide on desktop
		settings.attributes = Object.assign(settings.attributes, {
			hideOnDesktop: {
				type: 'boolean',
			}
		});
	}
	return settings;
}
 
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'vlge/general-custom-attribute',
	addGeneralAttribute
);


const generalResponsiveControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { Fragment } = wp.element;
		const { ToggleControl, PanelBody } = wp.components;
		const { InspectorControls } = wp.blockEditor;
		const { attributes, setAttributes, isSelected } = props;
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected  && 
					<InspectorControls>
						<PanelBody title="Responsive" initialOpen={false}>
							<ToggleControl
								label={wp.i18n.__('Hide on mobile', 'vlge')}
								checked={!!attributes.hideOnMobile}
								onChange={(newval) => setAttributes({ hideOnMobile: !attributes.hideOnMobile })}
								disabled={!!attributes.hideOnDesktop}
							/>
							<ToggleControl
								label={wp.i18n.__('Hide on desktop', 'vlge')}
								checked={!!attributes.hideOnDesktop}
								onChange={(newval) => setAttributes({ hideOnDesktop: !attributes.hideOnDesktop })}
								disabled={!!attributes.hideOnMobile}
							/>
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'generalResponsiveControls');
 
wp.hooks.addFilter(
	'editor.BlockEdit',
	'vlge/general-responsive-control',
	generalResponsiveControls
);


function generalApplyExtraClass(extraProps, blockType, attributes) {
	const { hideOnMobile } = attributes;
	const { hideOnDesktop } = attributes;
 
	if (typeof hideOnMobile !== 'undefined' && hideOnMobile) {
		extraProps.className = extraProps.className + ' hide-on-mobile';
	}

	if (typeof hideOnDesktop !== 'undefined' && hideOnDesktop) {
		extraProps.className = extraProps.className + ' hide-on-desktop';
	}
	return extraProps;

}
 
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'vlge/general-apply-class',
	generalApplyExtraClass
);