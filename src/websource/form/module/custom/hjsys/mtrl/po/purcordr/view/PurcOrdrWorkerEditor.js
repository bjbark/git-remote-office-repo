Ext.define('module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-purcordr-worker-editor',
	height	: 210,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 60 },
			items		: [
				{	fieldLabel	: Language.get('offr_numb', '발주번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					allowBlank	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					margin		: '5 5 5 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('cstm', '거래처' ),
					name		: 'cstm_name',
					allowBlank	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					pair		: 'cstm_idcd',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					clearable	: true ,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',puch_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('offr_drtr', '구매담당' ),
					name		: 'user_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					value		: _global.login_nm,
					clearable	: true ,
					popup		: {
						widget	: 'lookup-user-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('user_name'));
							pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true , value : _global.login_id
				},{	fieldLabel	: Language.get('offr_date', '발주일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
					name		: 'deli_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					listeners	: {
						change	: function(self, value) {
							var searchDeli = Ext.ComponentQuery.query('module-purcordr-worker-search')[0];
							searchDeli.down('[name=deli_date2]').setValue(this.value);
							searchDeli.down('[name=deli_hidn]').setValue(this.value);
						}
					}
				},{	fieldLabel	: Language.get('', '소요근거' ),
					name		: 'remk_text',
					xtype		: 'textfield',
				},{	fieldLabel	: Language.get('stot_dvcd', '결제구분' ),
					name		: 'stot_dvcd',
					xtype		: 'lookupfield',
					lookupValue	: resource.getList('stot_dvcd')
				},{	name : 'offr_dvcd', xtype	: 'textfield', hidden : true , value : '1200'
				},{	name : 'change'   , xtype	: 'textfield', hidden : true
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
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
			title 			: '비고',
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
							height		: 143,
							width		: 680,
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
