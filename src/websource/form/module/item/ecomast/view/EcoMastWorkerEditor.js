Ext.define('module.item.ecomast.view.EcoMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-ecomast-worker-editor',
	height	: 200,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.item.ecomast.store.EcoMastInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 70 },
			items		: [
				{	fieldLabel	: Language.get('', '변경 변호' ),
					name		: 'ecod_idcd',
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					readOnly	: true
				},{	layout:'hbox' , border: 0 ,
					items : [
						{	fieldLabel	: Language.get('item_code', '조립품목코드' ),
							name		: 'item_code',
							pair		: 'prnt_item_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							fieldCls	: 'requiredindex',
							allowBlank	: false,
							emptyText	: Const.invalid.emptyValue,
//							width		: 225,
							margin		: '5 5 5 0',
							clearable	: false ,
							listeners	: {
								keydown : function(self, e) {
									/* 엔터키 이벤트를 호출한다. */
									if (e.keyCode == e.ENTER ) {
										/* 팝업창을 호출한다. */
										self.onTriggerClick();
									} else if (e.keyCode == e.ESC) {
										me.attachItem({ clear : true });
									}
								}
							},
							popup		: {
								widget	: 'lookup-item-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0',acct_bacd:'ECO품목'},
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
										var search = Ext.ComponentQuery.query('module-ecomast-worker-search')[0],
											item = search.down('[name=item_code]');
										;
//										if(records[0].get('acct_bacd') == '3000'){
//											item.popup.params = {	stor_grp	: _global.stor_grp,
//																	stor_id		: _global.stor_id,
//																	line_stat	: '0',
//																	acct_bacd	: '반제품'
//																}
//										}else if(records[0].get('acct_bacd') == '2002'){
//											item.popup.params = {	stor_grp	: _global.stor_grp,
//													stor_id		: _global.stor_id,
//													line_stat	: '0',
//													acct_bacd	: '자재'
//												}
//										}
										var panel = nameField.up('form');
										panel.down('[name=item_name]').setValue(records[0].get('item_name'));
								}
							},
						},{	name : 'item_code', xtype	: 'textfield', hidden : true
						},{	name : 'prnt_item_idcd', xtype	: 'textfield', hidden : true
						},{ xtype		: 'numericfield',
							name		: 'cofm_degr',
							emptyText	: '1',
							readOnly	: true,
							hidden		: true,
							fieldCls	: 'readonlyfield',
							width		: 50,
							margin		: '5 5 5 0'
						}
					]
				},{	fieldLabel	: Language.get('item_name', '품명' ),
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					name		: 'item_name',
					margin		: '5 5 5 0'
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('ecod_date', '변경일자' ),
					name		: 'ecod_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					width		: 170,
					margin		: '10 5 5 0'
				},{	fieldLabel	: Language.get('strt_date', '적용일자' ),
					name		: 'strt_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					width		: 170,
					margin		: '10 5 5 0'
				},{	name : 'mngt_docm_numb'	, xtype : 'textfield'  , hidden : true,
				},{	fieldLabel	: Language.get('chge_resn_dvcd', '변경사유구분' ),
					xtype		: 'lookupfield',
					lookupValue	: resource.getList('chge_resn_dvcd'),
					editable	: false,
					name		: 'chge_resn_dvcd',
					margin		: '10 5 5 0'
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
			title 			: '변경사유',
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
							name		: 'chge_resn',
							height		: 163,
							width		: 1125,
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
