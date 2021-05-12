function addImageAttribute(settings, name) {
	if (typeof settings.attributes !== 'undefined') {
		if (name == 'core/image') {
			//Image fit cover
			settings.attributes = Object.assign(settings.attributes, {
				imageFitCover: {
					type: 'boolean',
				}
			});
			//Image fit contain
			settings.attributes = Object.assign(settings.attributes, {
				imageFitContain: {
					type: 'boolean',
				}
			});
		}
	}
	return settings;
}
 
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'vlge/image-custom-attribute',
	addImageAttribute
);

const imageControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { Fragment } = wp.element;
		const { ToggleControl, PanelBody } = wp.components;
		const { InspectorControls } = wp.blockEditor;
		const { attributes, setAttributes, isSelected } = props;
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (props.name == 'core/image') && 
					<InspectorControls>
						<PanelBody title={wp.i18n.__('Image fit mode', 'vlge') } initialOpen={false}>
							<ToggleControl
								label={wp.i18n.__('Cover', 'vlge')}
								checked={!!attributes.imageFitCover}
								onChange={(newval) => setAttributes({ imageFitCover: !attributes.imageFitCover })}
								disabled={!!attributes.imageFitContain}
							/>
							<ToggleControl
								label={wp.i18n.__('Contained', 'vlge')}
								checked={!!attributes.imageFitContain}
								onChange={(newval) => setAttributes({ imageFitContain: !attributes.imageFitContain })}
								disabled={!!attributes.imageFitCover}
							/>
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'imageControls');
 
wp.hooks.addFilter(
	'editor.BlockEdit',
	'vlge/image-controls',
	imageControls
);


function imageApplyExtraClass(extraProps, blockType, attributes) {
	const { imageFitCover } = attributes;
	const { imageFitContain } = attributes;
 
	if (typeof imageFitCover !== 'undefined' && imageFitCover) {
		extraProps.className = extraProps.className + ' image-fit-cover';
	}

	if (typeof imageFitContain !== 'undefined' && imageFitContain) {
		extraProps.className = extraProps.className + ' image-fit-contain';
	}
	return extraProps;
}
 
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'vlge/image-apply-class',
	imageApplyExtraClass
);