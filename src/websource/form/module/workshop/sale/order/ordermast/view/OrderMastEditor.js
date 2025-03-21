Ext.define('module.workshop.sale.order.ordermast.view.OrderMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-ordermast-editor',

	layout : {
		type: 'border'
	},

	title			: Language.get('acpt_info','수주 정보'),
	collapsible 	: true	,
	collapsed		: true	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
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
								width		: 150
							},{	xtype		: 'lookupfield'	,
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '1 0 0 5'
							},{	fieldLabel	: Language.get('esti_date','견적일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 70,
								width		: 190
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'datefield',
								name		: 'deli_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 70,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr', '회원명' ),
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								xtype		: 'popupfield',
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
							},{	text	: '＋',
								xtype	: 'button',
								width	: 25,
								height : 25,
								margin	: '0 0 0 0',
								action	: 'inputAction',
								cls		: 'button1-style'
							},{	fieldLabel	: Language.get('tele_numb','전화번호'),
								xtype		: 'textfield',
								name		: 'tele_numb',
								readOnly	: true,
								labelWidth	: 70,
								width		: 190
							},{	fieldLabel	: Language.get('mail_addr','이메일'),
								xtype		: 'textfield',
								name		: 'mail_addr',
								readOnly	: true,
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
								width		: 401,
							},{	fieldLabel	: Language.get('dlvy_mthd_dvcd','배송방법'),
								xtype		: 'lookupfield',
								name		: 'dlvy_mthd_dvcd',
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
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '1 0 2 2', width : 430,hidden		: false,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
						items	: [
							{	xtype		: 'textfield',
								name		: 'addr_2snd',
								width		: 528,
								readOnly	: false,
								hidden		: false,
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
								width		: 210,
							},{	fieldLabel	: Language.get('dlvy_tele_numb','배송지전화번호'),
								xtype		: 'textfield',
								name		: 'dlvy_tele_numb',
								labelWidth	: 80,
								width		: 190,
								vtype		: 'phone'
							},{	fieldLabel	: Language.get('dlvy_exps','배송비'),
								name		: 'dlvy_exps',
								xtype		: 'numericfield',
								labelWidth	: 53,
								width		: 123
							},{	xtype		: 'lookupfield'	,
								name		: 'dvex_burd_dvcd',
								lookupValue	: resource.lookup('dvex_burd_dvcd'),
								width		: 67,
								margin		: '1 0 0 5'
							}
						]
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab5()]
			}
		;
		return item;
	},

	createTab5 : function() {
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
							height		: 190,
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

});