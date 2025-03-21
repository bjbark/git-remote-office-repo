	Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-sjflv-export-ordermast2-worker-editor',
		height	: 180,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Invoice' );
		},
		initComponent: function(config){
			var me = this;
			me.dockedItems = [ me.createWest() ] ;
//			me.items = me.createTabs();
			me.callParent(arguments);
		},
	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			region		: 'center',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 1,
			fieldDefaults: { width : 260, labelWidth : 100},
			items		: [
				{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '0',
					items  : [
						{	fieldLabel	: Language.get('ordr_numb', 'Order No' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							width		: 195,
							emptyText	: Const.invalid.emptyValue,
						},{	xtype		: 'lookupfield',
							name		: 'line_stat',
							margin		: '1 0 0 5',
							width		: 60,
							lookupValue : resource.lookup('line_stat'),
							editable	: false
						},{	fieldLabel	: Language.get('mngt_numb', '관리번호' ),
							xtype		: 'textfield',
							name		: 'mngt_numb',
							margin		: '0 0 0 5',
						},{	fieldLabel	: Language.get('invc_date', 'Order Date' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin		: '0 0 0 5',
							width		: 200,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							allowBlank	: false,
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('bzpl_name', '사업장' ),
							name		: 'bzpl_name',
							pair		: 'bzpl_idcd',
							xtype		: 'popupfield',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							allowBlank	: false,
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							popup		: {
								widget	: 'lookup-bzpl-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('bzpl_name'));
									pairField.setValue(records[0].get('bzpl_idcd'));
								}
							},
						},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true,
						},{	fieldLabel	: Language.get('drtr_name', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							margin		: '0 0 0 5',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							},
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true,
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('expt_lcal_name', 'Area' ),
							xtype		: 'textfield',
							name		: 'expt_lcal_name',
							editable	: false,
						},{	fieldLabel	: Language.get('buyr_name', 'Customer' ),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							margin		: '0 0 0 5',
							editable	: false,
							clearable	: true,
							popup		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' ,sale_cstm_yorn:1},
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							},
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							allowBlank	: false,
						},{	xtype : 'textfield', name : 'cstm_idcd', hidden : true
						},{	fieldLabel	: Language.get('trde_trnt_dvcd', '운송방법' ),
							xtype		: 'lookupfield',
							name		: 'trde_trnt_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('trde_trnt_dvcd'),
							editable	: false,
							width		: 200
						},{	fieldLabel	: Language.get('pric_cond_dvcd', '가격조건' ),
							xtype		: 'lookupfield',
							name		: 'pric_cond_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('pric_cond_dvcd'),
							editable	: false,
							width		: 200
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('', 'Port of loading' ),
							xtype		: 'textfield',
							name		: 'ship_port',
						},{	fieldLabel	: Language.get('','Destination' ),
							xtype		: 'textfield',
							margin		: '0 0 0 5',
							name		: 'arvl_port',
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('mney_unit', '화폐단위' ),
							name		: 'mney_unit',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('crny_dvcd'),
							editable	: false,
						},{	fieldLabel	: Language.get('exrt', '적용환율' ),
							xtype		: 'numericfield',
							name		: 'exrt',
							margin		: '0 0 0 5',
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('user_memo', 'Remarks' ),
							xtype		: 'textfield',
							name		: 'user_memo',
							width		: 935
						},{	xtype		: 'textfield',
							hidden		: true,
							name		: 'modify'
						}
					]
				}
			]
		};
		return item;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				header	: false,
				plain	: true,
				margin	: 0 ,
				items	: [ me.createWest() ]
			}
		;
		return tabs;
	},
});
