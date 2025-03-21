	Ext.define('module.custom.sjflv.sale.export.offermast.view.OfferMastWorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-offermast-worker-editor',
		height	: 230,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.custom.sjflv.sale.export.offermast.store.OfferMastInvoice' );
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
			fieldDefaults: { width : 200, labelWidth : 70},
			items		: [
				{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '0',
					items  : [
						{	fieldLabel	: Language.get('offr_numb', 'Offer No' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							width		: 165,
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
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,

						},{	fieldLabel	: Language.get('amnd_degr', 'AMD' ),
							xtype		: 'numericfield',
							name		: 'amnd_degr',
							margin		: '0 0 0 5',
							width		: 140,
							labelWidth	: 100,
						},{	fieldLabel	: Language.get('invc_date', 'Offer Date' ),
							name		: 'invc_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							labelWidth  : 165,
							width		: 265
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
							width		: 230
						},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true,
						},{	fieldLabel	: Language.get('expt_dvcd', '수출구분' ),
							xtype		: 'lookupfield',
							name		: 'expt_dvcd',
							margin		: '0 0 0 5',
							editable	: false,
							lookupValue : resource.lookup('expt_dvcd'),
						},{	fieldLabel	: Language.get('offr_dvcd', 'Offer 구분' ),
							xtype		: 'lookupfield',
							name		: 'offr_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('offr_dvcd'),
							editable	: false,
							labelWidth	: 100,
							width		: 230
						},{	fieldLabel	: Language.get('ship_viaa_dvcd', 'Ship Via' ),
							xtype		: 'lookupfield',
							name		: 'ship_viaa_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('ship_viaa_dvcd'),
							editable	: false,
							width		: 170
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('buyr_name', 'Buyer' ),
							name		: 'buyr_name',
							pair		: 'buyr_idcd',
							xtype		: 'popupfield',
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
							width		: 230
						},{	name : 'buyr_idcd', xtype	: 'textfield', hidden : true,
						},{	fieldLabel	: Language.get('mdtn_prsn', '중개인' ),
							xtype		: 'textfield',
							name		: 'mdtn_prsn',
							margin		: '0 0 0 5',
							editable	: false,
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
							labelWidth	: 100,
							width		: 230
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true,
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('pric_cond_dvcd', '단가조건' ),
							xtype		: 'lookupfield',
							name		: 'pric_cond_dvcd',
							lookupValue : resource.lookup('pric_cond_dvcd'),
							editable	: false,
							width		: 230
						},{	fieldLabel	: Language.get('trde_stot_dvcd', '결제방법' ),
							xtype		: 'lookupfield',
							name		: 'trde_stot_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('trde_stot_dvcd'),
							editable	: false,
						},{	fieldLabel	: Language.get('stot_time_dvcd', '결제시기' ),
							xtype		: 'lookupfield',
							name		: 'stot_time_dvcd',
							margin		: '0 0 0 5',
							lookupValue : resource.lookup('stot_time_dvcd'),
							editable	: false,
							labelWidth	: 100,
							width		: 230
						},{	fieldLabel	: Language.get('stot_ddln', '결제기한' ),
							xtype		: 'textfield',
							name		: 'stot_ddln',
							margin		: '0 0 0 5',
							width		: 170
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
							margin		: '0 0 0 0',
						},{	fieldLabel	: Language.get('exrt', '적용환율' ),
							xtype		: 'numericfield',
							name		: 'expt_dvcd',
							margin		: '0 0 0 35',
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('ship_port', 'Loading Port' ),
							xtype		: 'textfield',
							name		: 'ship_port',
							width		: 230
						},{	fieldLabel	: Language.get('etdd', 'ETD' ),
							name		: 'etdd',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin		: '0 0 0 5',
						},{	fieldLabel	: Language.get('dsch_port', 'Discharging Port' ),
							xtype		: 'textfield',
							name		: 'dsch_port',
							margin		: '0 0 0 5',
							labelWidth	: 100,
							width		: 230
						},{	fieldLabel	: Language.get('etaa', 'ETA' ),
							name		: 'etaa',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin		: '0 0 0 5',
							width		: 170
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('arvl_port', 'Destination' ),
							xtype		: 'textfield',
							name		: 'arvl_port',
							width		: 230
						},{	fieldLabel	: Language.get('pckg_unit', 'Packing' ),
							name		: 'pckg_unit',
							xtype		: 'textfield',
							margin		: '0 0 0 5',
						},{	fieldLabel	: Language.get('ogin_name', 'Country of Origin' ),
							xtype		: 'textfield',
							name		: 'ogin_name',
							margin		: '0 0 0 5',
							labelWidth	: 100,
							width		: 230
						},{	fieldLabel	: Language.get('vldt', 'validity' ),
							name		: 'vldt',
							xtype		: 'textfield',
							margin		: '0 0 0 5',
							width		: 170
						}
					]
				},{	xtype  : 'fieldset', layout: 'hbox',
					border : 0,
					margin : '5 0 0 0',
					items  : [
						{	fieldLabel	: Language.get('user_memo', 'Remarks' ),
							xtype		: 'textfield',
							name		: 'user_memo',
							width		: 845
						},{	fieldLabel	: Language.get( 'change','change'),
							xtype		: 'textfield',
							name		: 'change',
							hidden		: true
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
