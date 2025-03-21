Ext.define('module.qc.basic.insptypeitem.view.InspTypeItemWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-insptypeitem-worker-editor',
	height	: 150,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.qc.basic.insptypeitem.store.InspTypeItemInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 75 },
			items		: [
				{	fieldLabel	: Language.get('insp_type_code', '검사유형코드' ),
					xtype		: 'textfield',
					name		: 'insp_type_code',
					readOnly	: true,
					fieldCls	: 'requiredindex',
					margin		: '5 5 5 0'
				},{	fieldLabel	: Language.get('insp_mthd_dvcd', '검사방법' ),
					xtype		: 'lookupfield',
					name		: 'insp_mthd_dvcd',
					readOnly	: true,
					lookupValue	: resource.lookup('insp_mthd_dvcd')	,
					fieldCls	: 'requiredindex',
					margin		: '15 15 15 0',
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('insp_type_name', '검사유형명' ),
					xtype		: 'textfield',
					name		: 'insp_type_name',
					readOnly	: true,
					fieldCls	: 'requiredindex',
					clearable	: false ,
				},{	fieldLabel	: Language.get('change', '변경유무' ),
					xtype		: 'textfield',
					name		: 'change',
					hidden		: true ,
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


	/**
	 *
	 */
	createTab1 : function() {
		var item = {
			title 			: '검사조건',
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
							name		: 'insp_cond',
							height		: 115,
							width		: 703,
							maxLength	: 100,
							readOnly	: true,
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
