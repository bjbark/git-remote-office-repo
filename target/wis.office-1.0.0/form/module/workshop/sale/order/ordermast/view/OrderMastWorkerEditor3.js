Ext.define('module.workshop.sale.order.ordermast.view.OrderMastWorkerEditor3', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-ordermast-worker-editor3',
	height	: 180,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.workshop.sale.order.ordermast.store.OrderMastInvoice' );
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
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 630,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
			items			: [
				{	name	: 'dept_idcd', xtype : 'textfield' , hidden : true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
							{	fieldLabel	: Language.get('esti_numb','견적번호'),
								name		: 'invc_numb',
								xtype		: 'textfield',
								allowBlank	: false	,
								fieldCls	: 'requiredindex',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 150
							},{	xtype		: 'lookupfield'	,
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '1 0 0 5'
							},{	fieldLabel	: Language.get('esti_date','견적일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 70,
								width		: 190
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'datefield',
								name		: 'deli_date',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 70,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr', '고객명' ),
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 185,
								popup		: {
									widget	: 'lookup-mmbr-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('mmbr_name'));
										pairField.setValue(records[0].get('mmbr_idcd'));
										me.down('[name=tele_numb]').setValue(records[0].get('hdph_numb'));
										me.down('[name=mail_addr]').setValue(records[0].get('mail_addr'));
										console.log(records[0]);
									}
								}
							},{	name : 'mmbr_idcd', xtype	: 'textfield', hidden : true,
								listeners:{
									change:function(){
										if(this.getValue()==""){
											me.down('[name=tele_numb]').setValue("");
											me.down('[name=mail_addr]').setValue("");
										}
									}
								}
							},{	fieldLabel	: Language.get('tele_numb','전화번호'),
								xtype		: 'textfield',
								name		: 'tele_numb',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 95,
								width		: 215
							},{	fieldLabel	: Language.get('mail_addr','이메일'),
								xtype		: 'textfield',
								name		: 'mail_addr',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 70,
								width		: 190,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm', '거래처명' ),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								editable	: true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								enableKeyEvents : true,
								clearable	: true ,
								width		: 185,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
										me.down('[name=post_code]').setValue(records[0].get('post_code'));
										me.down('[name=addr_1fst]').setValue(records[0].get('addr_1fst'));
										me.down('[name=addr_2snd]').setValue(records[0].get('addr_2snd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('ordr_ttle','주문명'),
								xtype		: 'textfield',
								name		: 'invc_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 401,
							},{	fieldLabel	: Language.get('dlvy_mthd_dvcd','배송방법'),
								xtype		: 'lookupfield',
								name		: 'dlvy_mthd_dvcd',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 70,
								width		: 190,
								lookupValue	: resource.lookup('dlvy_mthd_dvcd')
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: '배송지',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'post_code',
								allowBlank	: true,
								clearable	: false ,
								editable	: true,
								hidden		: false,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
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
													setTimeout(function(){
														panel.down('[name=addr_2snd]').focus(true);
													}, 50)
											}
									}
								}
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '1 0 2 2', width : 430,hidden		: false,readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
						items	: [
							{	xtype		: 'textfield',
								name		: 'addr_2snd',
								width		: 528,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								maxLength	: 100,
								maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
								margin		: '0 0 5 65'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
						{	fieldLabel	: Language.get('rctr_name','수취인'),
							xtype		: 'textfield',
							name		: 'rctr_name',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							width		: 210,
						},{	fieldLabel	: Language.get('dlvy_tele_numb','전화번호'),
							xtype		: 'textfield',
							name		: 'dlvy_tele_numb',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							labelWidth	: 70,
							width		: 190,
							vtype		: 'phone'
						},{	fieldLabel	: Language.get('dlvy_exps','배송비'),
							name		: 'dlvy_exps',
							xtype		: 'numericfield',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							labelWidth	: 53,
							width		: 123
						},{	xtype		: 'lookupfield'	,
							name		: 'dvex_burd_dvcd',
							readOnly	: true,
							fieldCls	: 'readonlyfield',
							lookupValue	: resource.lookup('dvex_burd_dvcd'),
							width		: 65,
							margin		: '1 0 0 5'
						},{	name : 'modify', xtype	: 'textfield', hidden : true
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
			title 			: '배송메모',
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
							name		: 'dlvy_memo',
							height		: 180,
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
