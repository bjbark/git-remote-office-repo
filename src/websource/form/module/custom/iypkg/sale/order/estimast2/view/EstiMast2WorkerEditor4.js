Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor4', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-estimast2-worker-editor4',
	height	: 235,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice4' );
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
			fieldDefaults: { width : 280, labelWidth : 70 },
			items		: [
				{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('','견적번호'),
							xtype		: 'textfield',
							name		: 'invc_numb',
						}
					]
				},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 0 0', fieldDefaults: { width : 280, labelWidth : 70 },
					items	: [
						{	fieldLabel	: Language.get('esti_case_name', '건명' ),
							name		: 'esti_case_name',
							xtype		: 'textfield',
						},{	fieldLabel	: Language.get('cstm_code','거래처코드'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_code',
							pair		: 'cstm_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_code'));
									pairField.setValue(records[0].get('cstm_idcd'));
									me.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
								}
							}
						},{ xtype		: 'textfield', name : 'cstm_idcd', hidden : true
						},{	fieldLabel	: Language.get('cstm_name','거래처명'),
							xtype		: 'textfield',
							name		: 'cstm_name',
						},{	fieldLabel	: Language.get('sale_drtr','담당사원'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							clearable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('esti_date', '견적일자' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						},{	fieldLabel	: Language.get('rcvr_name', '수신' ),
							name		: 'rcvr_name',
							xtype		: 'textfield',
						},{	fieldLabel	: Language.get('', '조달구분' ),
							name		: 'supl_dvcd',
							margin		: '0 5 0 0',
							xtype		: 'lookupfield',
							lookupValue : resource.lookup('supl_dvcd'),
						},{	name : 'chk', xtype	: 'textfield', hidden : true
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
				items	: [ me.createTab1() , me.createTab2() ]
			}
		;
		return tabs;
	},

	createTab1 : function() {
		var me		= this;
		var item	=
			{	title	: Language.get( '' , '견적내역'),
				xtype	: 'module-estimast2-editor-lister3',
			};
		return item;
	},


	createTab2 : function() {
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
							name		: 'memo',
							height		: 199,
							width		: 425,
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
