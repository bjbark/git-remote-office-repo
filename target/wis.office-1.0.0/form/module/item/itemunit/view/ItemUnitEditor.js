Ext.define('module.item.view.itemunit.ItemUnitEditor', {extend  : 'Axt.form.Editor',
	alias		: 'widget.module-itemunit-editor',
	height		: 250,
	title		: '계량 단위',
	collapsible	: true,
	collapsed	: true,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock() , me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var item = {
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls : 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls : 'button-style'}, '-'
				]
			};
		return item;
	},


	/**
	 *
	 */
	createWest : function () {
		var item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 330,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset',
						layout	: 'hbox',
						padding	: '0',
						border	:  0 ,
						margin	: '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get( 'unit_name', '단위코드' ),
								name		: 'unt_cd',
								xtype		: 'textfield',
								width		: 255,
								allowBlank	: false ,
								maxLength	: 3 ,
								emptyText	: Const.invalid.emptyValue
							},{
								name		: 'row_sts',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('row_sts'),
								editable	: false,
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get( 'unit_name' , '단위명'),
						name		: 'unit_name',
						xtype		: 'textfield',
						allowBlank	: false,
						emptyText	: Const.invalid.emptyValue,
						//width		: 265 ,
						maxLength	: 10 ,
						itemId		: 'initfocused'
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
		var tabs =
			{	xtype	: 'tabpanel',
				region	: 'center',
				style	: 'margin-left : 1px;',
				margin	: 0 ,
				plain	: true,
				items 	: [
				{		title		: '추가정보' ,
						xtype		: 'form-panel' ,
						layout		: 'vbox',
						border		: 0 ,
						bodyStyle	: { padding: '5px' },
						frame		: false,
						region		: 'center',
						defaultType	: 'textfield',
						flex		: 1,
				items	: [
						{	xtype		: 'textarea',
							name		: 'user_memo' ,
							fieldLabel	: '메모사항',
							height		: 150
						}
					]
				}
			]
		};
		return tabs;
	}
});

