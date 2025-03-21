 Ext.define('module.custom.sjflv.item.bomlist.view.BomListSpecEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-sjflv-bomlist-spec-editor',
	layout		: { type: 'fit' },
	title		: 'Specification',
	collapsible 	: false	,
	collapsed		: false	,
	width	: 450,
	//64 +
	initComponent: function(config){
		var me = this;
		me.dockedItems	= [ me.createDock(),me.createWest()  ] ;
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this;
		var item =
			{	xtype : 'toolbar',
				dock  : 'bottom',
				items : [
				]
			};
		return item;
	},

	changeEdit : function( readonly ) {
		this.getForm().getFields().each (function (field) {
			if (field.onwerEditing) {
				field.setReadOnly (readonly);
			}
		});
	},

	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item ={
				xtype		: 'form-panel',
				dock		: 'left',
				bodyStyle	: { padding: '5px' },
				width		: 860,
				fieldDefaults: { width : 800, labelWidth : 90, labelSeparator : '',margin:'10 0 5 0' },
				items		: [
					{	fieldLabel	: Language.get( '', '' ),
						name		: 'item_idcd',
						xtype		: 'textfield',
						hidden		: true
					},{	fieldLabel	: Language.get( 'appr', 'Apperarance' ),
						name		: 'appr',
						xtype		: 'textfield',
						readOnly	: true
					},{	fieldLabel	:  Language.get( 'test_ordr' , 'Test And ORDR'),
						name		: 'test_ordr',
						xtype		: 'textfield',
						readOnly	: true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'dnst' , 'Density(20ºC)'),
								name		: 'dnst',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'rfct_indx' , 'Refractive<br>Index(20ºC)'),
								name		: 'rfct_indx',
								xtype		: 'textfield',
								margin		: '0 0 0 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'asen' , 'Arsenic'),
								name		: 'asen',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'hmtl' , '중금속'),
								name		: 'hmtl',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'lead' , '납'),
								name		: 'lead',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'alin_mtrl' , '이물'),
								name		: 'alin_mtrl',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	fieldLabel	:  Language.get( 'ingd' , 'Ingredients'),
						name		: 'ingd',
						xtype		: 'textarea',
						readOnly	: true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'slvt_carr' , 'Solvent/Carrier'),
								name		: 'slvt_carr',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'shlf_life' , 'Shelf Life'),
								name		: 'shlf_life',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	fieldLabel	:  Language.get( 'strg_cond' , 'Storage<br>Conditions'),
						name		: 'strg_cond',
						xtype		: 'textfield',
						readOnly	: true
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'melt_pont' , 'Melting Point'),
								name		: 'melt_pont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'flsh_pont' , 'Flash Point'),
								name		: 'flsh_pont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'ph' , 'PH'),
								name		: 'ph',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'ecil' , 'E-Coil'),
								name		: 'ecil',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'vtrl_cont' , 'Vacterrial Count'),
								name		: 'vtrl_cont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								width		: 410,
								readOnly	: true
							},{	fieldLabel	:  Language.get( 'brix' , 'Brix'),
								name		: 'brix',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								labelWidth	: 80,
								width		: 390,
								readOnly	: true
							}
						]
					},{	fieldLabel	:  Language.get( 'etcc_cont' , '기타사항'),
						name		: 'etcc_memo',
						xtype		: 'textfield',
						readOnly	: true
					},{	fieldLabel	:  Language.get( 'guis' , '외관'),
						name		: 'guis',
						xtype		: 'textfield',
						readOnly	: true
					},{	fieldLabel	:  Language.get( 'remk_memo' , '비고'),
						name		: 'remk_memo',
						xtype		: 'textarea',
						readOnly	: true
					}
				]
			}
		;
		return item;
	},
	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype  : 'tabpanel',
				region : 'center',
				plain  : true,
				margin : 0 ,
				items  : [ me.createTab1()]
			}
		;
		return tabs;
	},

});