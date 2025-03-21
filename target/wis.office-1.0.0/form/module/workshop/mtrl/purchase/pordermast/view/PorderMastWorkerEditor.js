Ext.define('module.workshop.mtrl.purchase.pordermast.view.PorderMastWorkerEditor', { extend: 'Axt.form.Editor',


	alias	: 'widget.module-pordermast-worker-editor',
	height	:  _global.options.mes_system_type.toUpperCase() == 'SJFLV'? 240 : 210,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.workshop.mtrl.purchase.pordermast.store.PorderMastInvoice' );
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

							if (_global.hq_id.toUpperCase()=='N1000HNTOP'){
								var searchForm = Ext.ComponentQuery.query('module-purcordr-worker-search')[0];

								searchForm.down('[name=item_code]').popup.params.cstm_idcd = records[0].get('cstm_idcd');

							}

					},
					listeners	: {
							change	: function(){
								var searchForm = Ext.ComponentQuery.query('module-purcordr-worker-search')[0];
//								searchForm.down('[name=item_code]').popup.params.find = this.getValue();
								searchForm.down('[name=item_code]').popup.params.cstm_idcd = records[0].get('cstm_idcd');
//								if(this.value == ''){
//									me.down('[name=cstm_idcd]').setValue(null);
//									searchForm.down('[name=item_code]').popup.params.cstm_idcd = null;
//								}
							}
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('offr_drtr', '구매담당' ),
					name		: 'user_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					value		: _global.login_nm,
					clearable	: false ,
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
				},{	fieldLabel	: Language.get('supl_dvcd', '조달구분' ),
					name		: 'supl_dvcd',
					xtype		: 'lookupfield',
					lookupValue	: resource.getList('supl_dvcd'),
					hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
					listeners	: {
						beforeselect: function(self, value, index, eOpts ) {
							if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
								var lister = Ext.ComponentQuery.query('module-purcordr-worker-lister')[0],
								val = this.getValue(),
								records = lister.getSelectionModel().getSelection();

								if ( lister.getStore().getCount()>=1) {
									Ext.Msg.alert("알림", "품목이 등록되어 조달구분을 변경할 수 없습니다.");
									return false;
								}


								if (value.get('code') == "6000") {
									me.down('[name=crny_dvcd]').show();
									me.down('[name=trde_trnt_dvcd]').show();
									me.setHeight(290);
								}else{
									me.down('[name=crny_dvcd]').hide();
									me.down('[name=trde_trnt_dvcd]').hide();
									me.setHeight(240);
								}
							}
						}
					}
				},{	fieldLabel	: Language.get('stot_dvcd', '결제구분' ),
					name		: 'stot_dvcd',
					xtype		: 'lookupfield',
					lookupValue	: resource.getList('stot_dvcd')
				},{	fieldLabel	: Language.get('crny_dvcd', '화폐단위' ),
					name		: 'crny_dvcd',
					xtype		: 'lookupfield',
					lookupValue	: resource.lookup('crny_dvcd'),
					hidden		: true
				},{	fieldLabel	: Language.get('trde_trnt_dvcd', '운송수단' ),
					name		: 'trde_trnt_dvcd',
					xtype		: 'lookupfield',
					lookupValue	: resource.lookup('trde_trnt_dvcd'),
					hidden		: true
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
			itemId			:'purcordr',
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
	},

	/**
	 *
	 */

});
