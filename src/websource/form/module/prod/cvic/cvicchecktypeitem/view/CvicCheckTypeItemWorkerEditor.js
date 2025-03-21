Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-cvicchecktypeitem-worker-editor',
	height	: 150,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 75},
			items		: [
				{	fieldLabel	: Language.get('chek_type_code', '점검유형코드' ),
					xtype		: 'textfield',
					name		: 'chek_type_code',
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue	,
					clearable	: false,
					margin		: '15 5 15 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('chek_mthd_dvcd', '점검방법' ),
					xtype		: 'lookupfield',
					lookupValue	: resource.lookup('chek_mthd_dvcd')	,
					name		: 'chek_mthd_dvcd',
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue	,
					clearable	: false,
					margin		: '5 5 15 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('chek_type_name', '점검유형명' ),
					xtype		: 'textfield',
					name		: 'chek_type_name',
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue	,
					clearable	: false,
					margin		: '5 5 15 0',
					readOnly	: true
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var item = {
			title 			: '점검조건',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype		: 'textarea',
							name		: 'chek_cond',
							readOnly	: true,
							height		: 115,
							width		: 733,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				}
			]
		}
	;
	return item;
	}
});
