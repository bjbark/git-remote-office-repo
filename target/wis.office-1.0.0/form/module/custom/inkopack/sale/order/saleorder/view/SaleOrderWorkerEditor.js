Ext.define('module.custom.inkopack.sale.order.saleorder.view.SaleOrderWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-inkopack-saleorder-worker-editor',
	height	: 260,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.inkopack.sale.order.saleorder.store.SaleOrderInvoice' );
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
			fieldDefaults: { width : 280, labelWidth : 70 , margin : '15 0 0 0'},
			items		: [
				{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					allowBlank	: false,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					margin		: '35 10 5 0',
					readOnly	: true
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					clearable	: true,
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));
							//납품처 정보에 set
							var deli = Ext.ComponentQuery.query('#cstm_deli')[0];
							deli.down('[name=post_code]').setValue(records[0].get('dlvy_zpcd'));	//우편번호
							deli.down('[name=addr_1fst]').setValue(records[0].get('dlvy_addr_1fst'));	//주소1
							deli.down('[name=addr_2snd]').setValue(records[0].get('dlvy_addr_2snd'));	//주소2
							deli.down('[name=tele_numb_1fst]').setValue(records[0].get('dlvy_tele_numb'));	//전화번호
							deli.down('[name=line_seqn2]').setValue(records[0].get('line_seqn2'));	//마지막시퀀스
							//search item_code(popup)에 set
							var search = Ext.ComponentQuery.query('module-inkopack-saleorder-worker-search')[0];
							var item_popup = search.down('[name=item_code]');
							item_popup.popup.params = {	stor_grp	: _global.stor_grp,
														stor_id		: _global.stor_id,
														line_stat	: '0',
														acct_bacd	: '제품',
														add			: '1',
														cstm		: records[0].get('cstm_idcd'),
														cstm_name	: records[0].get('cstm_name')
													  }
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
					name		: 'user_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					value		: _global.login_nm,
					clearable	: true,
					popup		: {
						widget	: 'lookup-user-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
				},{	fieldLabel	: Language.get('acpt_date', '주문일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	fieldLabel	: Language.get('cstm_pcod_numb', '고객주문번호' ),
					xtype		: 'textfield',
					name		: 'pcod_numb',
				},{	xtype		: 'textfield',
					name		: 'chk',
					margin		: '5 5 5 0',
					hidden		: true
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
				items	: [ me.createTabs2(), me.createTabs1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
	createTabs1 : function() {
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
							height		: 195,
							width		: '100%',
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

	createTabs2 : function() {
		var me = this,
			item = {
			id			: 'cstm_deli',
			title 		: '납품처 정보',
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 -5 0',
					items		: [
						{	fieldLabel	: '택배비 부담',
							xtype		: 'checkboxgroup',
							name		: '',
							width		: 78
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
							items		: [
								{	xtype	: 'checkboxfield',
									labelSeparator: '',
									allowBlank: true,
									boxLabel: '자사' ,
									name : 'pric_burd_dvcd1',
									inputValue: 1,
									width : 50 ,
									listeners: {
										change: function(chkbox,newVal,oldVal) {
											var a = me.down('[name=pric_burd_dvcd2]').getValue();
											if(chkbox.getValue() == true && a == true){
												me.down('[name=pric_burd_dvcd2]').setValue(false);
											}
										}
									}
								},{	xtype	: 'checkboxfield',
									labelSeparator: '',
									allowBlank: true,
									boxLabel: '고객사',
									name : 'pric_burd_dvcd2',
									inputValue: 2,
									width : 50,
									listeners: {
										change: function(chkbox,newVal,oldVal) {
											var a = me.down('[name=pric_burd_dvcd1]').inputValue;
											if(chkbox.getValue() == true && a == true){
												me.down('[name=pric_burd_dvcd1]').setValue(false);
											}
										}
									}
								}
							]
						},{	fieldLabel	: '거래처 정보에 등록',
							xtype		: 'checkboxfield',
							name		: 'chk',
							labelWidth	: 100,
							margin		: '0 0 0 180',
							width		: 150,
							inputValue	: 1,
							uncheckedValue : 0,
						},{	xtype		: 'textfield', name		: 'pric_burd_dvcd', hidden		: true
						},{	xtype		: 'textfield', name		: 'dlvy_line_seqn', hidden		: true
						},{	xtype		: 'textfield', name		: 'line_seqn2', hidden		: true
						},{	xtype		: 'textfield', name		: 'last_seqn' , hidden		: true
						}
					]
				},{	fieldLabel	: '배송방법',
					xtype		: 'lookupfield',
					allowBlank	: true,
					name		: 'dlvy_mthd_dvcd',
					lookupValue	: resource.lookup('trnt_mthd_dvcd'),
					width		: 270,
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					padding	: '0',
					border	:  0,
					margin	: '0 0 5 0' ,
					items		:[
						{	fieldLabel	: 'BOX/택배비',
							xtype		: 'textfield',
							name		: '',
							width		: 270,
							margin		: '0 10 0 0'
						},{	xtype		: 'numericfield',
							name		: 'dlvy_exps',
							width		: 215,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
					items	: [
						{	fieldLabel	: '주소',
							xtype		: 'popupfield',
							editable 	: true,
							enableKeyEvents : true,
							name		: 'post_code',
							pair		: '',
							allowBlank	: true,
							clearable	: false ,
							width		: 160,
							popup		: {
								select	: 'DAUM',
								widget	: 'popup-zipcode-search',
								params	: { },
								result	: function(records, nameField, pairField){
									var panel   = nameField.up('form');
										if( records.length > 0 ){
											var address = records[0];
												nameField.setValue( address.zonecode );
												panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
												panel.down('[name=addr_2snd]').focus(true , 10);
										}
								}
							}
						},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0 0 2 2', width : 333
						}
						]
				},{	xtype		: 'textfield',
					name		: 'addr_2snd',
					width		: 420,
					maxLength	: 100,
					maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
					margin		: '0 0 5 75'
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					padding	: '0',
					border	:  0,
					margin	: '0 0 5 0' ,
					items		:[
						{	fieldLabel	: '전화번호',
							xtype		: 'textfield',
							name		: 'tele_numb_1fst',
							width		: 270,
							margin		: '0 10 0 0'
						},{	xtype		: 'textfield',
							name		: 'tele_numb_2snd',
							width		: 215,
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox',
					padding	: '0',
					border	:  0,
					margin	: '0 0 5 0' ,
					items		:[
						{	fieldLabel	: '수취인/발송인',
							name		: 'rctr_name',
							xtype		: 'textfield',
							width		: 270,
							margin		: '0 10 0 0'
						},{	xtype		: 'textfield',
							name		: 'send_hmlf',
							width		: 215
						}
					]
				},{	fieldLabel	: '전달사항',
					name		: 'dlvy_atcl',
					xtype		: 'textfield',
					width		: 495
				}
			]
		};
		return item;
	}
});
