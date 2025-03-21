 Ext.define('module.custom.sjflv.item.itemspeclist.view.ItemSpecListEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-itemspeclist-editor',
	layout		: { type: 'border' },
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
				width		: 680,
				fieldDefaults: { width : 660, labelWidth : 90, labelSeparator : '',margin:'10 0 5 0' },
				items		: [
					{	fieldLabel	: Language.get( '', '' ),
						name		: 'item_idcd',
						xtype		: 'textfield',
						hidden		: true
					},{	fieldLabel	: Language.get( 'appr', '성상' ),
						name		: 'appr',
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	:  Language.get( 'test_ordr' , 'Test And ORDR'),
						name		: 'test_ordr',
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'dnst' , '비중(20ºC)'),
								name		: 'dnst',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	:  Language.get( 'rfct_indx' , '굴절(20ºC)'),
								name		: 'rfct_indx',
								xtype		: 'textfield',
								margin		: '0 0 0 0',
								labelWidth	: 80,
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	fieldLabel	:  Language.get( 'asen' , '비소'),
								name		: 'asen',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	fieldLabel	:  Language.get( 'hmtl' , '중금속'),
								name		: 'hmtl',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								labelWidth	: 80,
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
							},{	fieldLabel	:  Language.get( 'lead' , '납'),
								name		: 'lead',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								labelWidth	: 80,
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
//							{	fieldLabel	:  Language.get( 'lead' , '납'),
//								name		: 'lead',
//								xtype		: 'textfield',
//								margin		: '0 0 5 0',
//								width		: 330,
//								readOnly	: true,
//								fieldCls	: 'readonlyfield',
//							},
							{	fieldLabel	:  Language.get( 'alin_mtrl' , '이물'),
								name		: 'alin_mtrl',
								xtype		: 'textfield',
								margin		: '0 0 5 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	xtype		: 'checkbox',
								name		: 'brix_yorn',
								checked		: brix_yorn = '1' ? true : false,
								style		: { color: 'Black'},
								margin		: '0 0 0 35',
								width		: 5,
								readOnly	: true,
							},{	fieldLabel	:  Language.get( 'brix' , 'Brix'),
								name		: 'brix',
								xtype		: 'textfield',
								margin		: '0 0 0 0',
								labelWidth	: 40,
								width		: 290,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	fieldLabel	:  Language.get( 'ingd' , '비고'),
						name		: 'ingd',
						xtype		: 'textarea',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	xtype		: 'checkbox',
						name		: 'ingd_yorn',
						boxLabel	: '※ 첨 부 : 용도 및 용법 - 1부',
						checked		: ingd_yorn = '1' ? true : false,
						style		: { color: 'Black'},
						margin		: '0 0 0 100',
						width		: 300,
						readOnly	: true,
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						hidden	: true,
						items : [
							{	fieldLabel	:  Language.get( 'slvt_carr' , 'Solvent/Carrier'),
								name		: 'slvt_carr',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
							},{	fieldLabel	:  Language.get( 'shlf_life' , 'Shelf Life'),
								name		: 'shlf_life',
								xtype		: 'textfield',
								margin		: '7 0 0 0',
								labelWidth	: 80,
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
							}
						]
					},{	fieldLabel	:  Language.get( 'strg_cond' , 'Storage<br>Conditions'),
						name		: 'strg_cond',
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						hidden	: true,
						items : [
							{	fieldLabel	:  Language.get( 'melt_pont' , 'Melting Point'),
								name		: 'melt_pont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
							},{	fieldLabel	:  Language.get( 'flsh_pont' , 'Flash Point'),
								name		: 'flsh_pont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								labelWidth	: 80,
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						items : [
							{	xtype		: 'checkbox',
								name		: 'ph_yorn',
								checked		: ph_yorn = '1' ? true : false,
								style		: { color: 'Black'},
								margin		: '0 0 0 35',
								width		: 5,
								readOnly	: true,
							},{	fieldLabel	:  Language.get( 'ph' , '멜라민'),
								name		: 'ph',
								xtype		: 'textfield',
								margin		: '0 0 0 0',
								labelWidth	: 50,
								width		: 290,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							},{	xtype		: 'checkbox',
								name		: 'ecil_yorn',
								checked		: ecil_yorn = '1' ? true : false,
								style		: { color: 'Black'},
								margin		: '0 0 0 20',
								width		: 5,
								readOnly	: true,
							},{	fieldLabel	:  Language.get( 'ecil' , '알레르기'),
								name		: 'ecil',
								xtype		: 'textfield',
								margin		: '0 0 0 0',
								labelWidth	: 55,
								width		: 305,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0,
						hidden	: true,
						items : [
							{	fieldLabel	:  Language.get( 'vtrl_cont' , 'Vacterrial Count'),
								name		: 'vtrl_cont',
								xtype		: 'textfield',
								margin		: '5 0 0 0',
								width		: 330,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								hidden		: true,
//							},{	fieldLabel	:  Language.get( 'brix' , 'Brix'),
//								name		: 'brix',
//								xtype		: 'textfield',
//								margin		: '5 0 0 0',
//								labelWidth	: 80,
//								width		: 330,
//								readOnly	: true,
//								fieldCls	: 'readonlyfield',
							}
						]
					},{	fieldLabel	:  Language.get( 'etcc_cont' , '용도용법'),
						name		: 'etcc_memo',
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	:  Language.get( 'guis' , '외관'),
						name		: 'guis',
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
					},{	fieldLabel	:  Language.get( 'remk_text' , '특이사항'),
						name		: 'remk_text',
						xtype		: 'textarea',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
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