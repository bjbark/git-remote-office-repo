Ext.define('module.custom.hjsys.sale.order.slorlist1.view.SlorList1Editor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-hjsys-slorlist1-editor',
	height	: 115,
	header	: false,

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
			fieldDefaults: { width : 280, labelWidth : 70, margin : '8 0 0 0'},
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '8 5 0 0',
					items	: [
						{	fieldLabel	: Language.get('cstm_name', '고객명' ),
							name		: 'cstm_name',
							xtype		: 'textfield',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('modl_name', '모델명' ),
							xtype		: 'textfield',
							name		: 'modl_name',
							readOnly	: true,
							width		: 290,
							fieldCls	: 'readonlyfield',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
					items	: [
						,{	fieldLabel	: Language.get('dlvy_cstm_name', '납품처' ),
							name		: 'dlvy_cstm_name',
							xtype		: 'textfield',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('invc_date', '수주일자' ),
							name		: 'invc_date',
							xtype		: 'textfield',
							readOnly	: true,
							width		: 155,
							fieldCls	: 'readonlyfield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							labelWidth	: 50,
							width		: 135,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin :0,
					items	: [
						{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
							xtype		: 'textfield',
							name		: 'hidden_numb',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						},{	fieldLabel	: Language.get('unit_name', '단위' ),
							name		: 'unit_name',
							xtype		: 'textfield',
							readOnly	: true,
							width		: 155,
							fieldCls	: 'readonlyfield',
						},{	name : 'unit_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('acpt_qntt', '수주수량' ),
							name		: 'acpt_qntt',
							xtype		: 'numericfield',
							minValue	: '',
							labelWidth	: 50,
							width		: 135,
							readOnly	: true,
							fieldCls	: 'readonlyfield',
						}
					]
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
			title 			: '메모사항',
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
							name		: 'user_memo',
							height		: 76,
							width		: '100%',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
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
