function addButtonAttribute(settings, name) {
	if (typeof settings.attributes !== 'undefined') {
		if (name == 'core/button') {
			settings.attributes = Object.assign(settings.attributes, {
				buttonShakeAnimation: {
					type: 'boolean',
				}
			});
		}
	}
	return settings;
}
 
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'vlge/button-custom-attribute',
	addButtonAttribute
);

const buttonControl = wp.compose.createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { Fragment } = wp.element;
		const { ToggleControl, PanelBody } = wp.components;
		const { InspectorControls } = wp.blockEditor;
		const { attributes, setAttributes, isSelected } = props;
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (props.name == 'core/button') && 
					<InspectorControls>
						<PanelBody title={wp.i18n.__('Animation on hover', 'vlge') } initialOpen={false}>
							<ToggleControl
								label={wp.i18n.__('Shake', 'vlge')}
								checked={!!attributes.buttonShakeAnimation}
								onChange={(newval) => setAttributes({ buttonShakeAnimation: !attributes.buttonShakeAnimation })}
							/>
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'buttonControl');
 
wp.hooks.addFilter(
	'editor.BlockEdit',
	'vlge/buttons-controls',
	buttonControl
);


function buttonApplyExtraClass(extraProps, blockType, attributes) {
	const { buttonShakeAnimation } = attributes;
 
	if (typeof buttonShakeAnimation !== 'undefined' && buttonShakeAnimation) {
		extraProps.className = extraProps.className + ' button-shake-animation';
	}

	return extraProps;
}
 
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'vlge/button-apply-class',
	buttonApplyExtraClass
);