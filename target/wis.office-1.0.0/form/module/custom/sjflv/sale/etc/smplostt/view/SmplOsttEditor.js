Ext.define('module.custom.sjflv.sale.etc.smplostt.view.SmplOsttEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-smplostt-editor',
	title	: Language.get('smpl_ostt','출고실적 등록'),
	height : 430,
	layout : {
	type: 'border'
	},


	collapsible 	: true			,
	collapsed		: true			,
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
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style', hidden:true,itemId:'update'},
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style', hidden:true,itemId:'cancel'}, '-'
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
				width			: 400,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{ fieldLabel	: '출고일자',
								xtype		: 'datefield',
								name		: 'ostt_date',
								width		: 190,
								margin		: '10 0 0 20',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: '출고담당자',
								name		: 'ostt_drtr_name',
								pair		: 'ostt_drtr_idcd',
								xtype		: 'popupfield',
								margin		: '5 0 0 20',
								width		: 190,
								popup		: {
									widget	: 'lookup-user-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'ostt_drtr_idcd', xtype	: 'textfield', hidden : true,
							},{	fieldLabel	: '출고수량',
								name		: 'ostt_qntt',
								xtype		: 'numericfield',
								margin		: '5 0 0 20',
								width		: 190,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								 format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
							},{	fieldLabel	: '과세',
								xtype		: 'lookupfield',
								name		: 'npay_yorn',
								margin		: '5 0 0 20',
								width		: 190,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
											npay_yorn = panel.down('[name=npay_yorn]').getValue();
											ostt_amnt = panel.down('[name=ostt_amnt]').getValue();
										if(npay_yorn == 0){
											panel.down('[name=ostt_vatx]').setValue(0);
											panel.down('[name=ostt_smam]').setValue(ostt_amnt);
										}else{
											var ostt_vatx = Number(ostt_amnt) * 0.1;
											var ostt_smam = Number(ostt_amnt) + Number(ostt_vatx);
											panel.down('[name=ostt_vatx]').setValue(ostt_vatx);
											panel.down('[name=ostt_smam]').setValue(ostt_smam);
										}
									}
								},
								lookupValue	: resource.lookup('yorn'),
							},{	fieldLabel	: '출고금액',
								name		: 'ostt_amnt',
								xtype		: 'numericfield',
								margin		: '5 0 0 20',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 190,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var npay_yorn = panel.down('[name=npay_yorn]').getValue();
										var ostt_amnt = panel.down('[name=ostt_amnt]').getValue();

										if(npay_yorn == 0){
											panel.down('[name=ostt_vatx]').setValue(0);
											panel.down('[name=ostt_amnt]').setValue(ostt_amnt);
										} else {
											var ostt_vatx = Number(ostt_amnt) * 0.1;
											var ostt_smam = Number(ostt_amnt) + Number(ostt_vatx);
											panel.down('[name=ostt_vatx]').setValue(ostt_vatx);
											panel.down('[name=ostt_smam]').setValue(ostt_smam);
										}
									}
								},
							},{	fieldLabel	: '출고부가세',
								name		: 'ostt_vatx',
								xtype		: 'numericfield',
								margin		: '5 0 0 20',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 190,
							},{	fieldLabel	: '출고합계금액',
								name		: 'ostt_smam',
								xtype		: 'numericfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '5 0 0 20',
								width		: 190,
							},{	fieldLabel	: '비고',
								margin		: '5 0 0 20',
								xtype		: 'textarea',
								name		: 'user_memo',
								height		:  32,
								width		: 350,
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
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
		item = {
				xtype			: 'form-panel',
				dock			: 'right',
				title			:  Language.get('','의뢰내역'),
				width			: 770,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: '접수번호',
								name		: 'invc_numb',
								xtype		: 'textfield',
								itemId		: 'invc_numb',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 210,
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '1 0 0 5',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: '접수일자',
								xtype		: 'datefield',
								name		: 'invc_date',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '0 0 0 100',
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('', '사업장' ),
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 270,
								clearable	: false ,
								popup		: {
									widget	: 'lookup-bzpl-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('bzpl_name'));
											pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name : 'bzpl_idcd', xtype	: 'textfield', hidden : true, value : _global.login_id
							},{	fieldLabel	: Language.get('', '담당자' ),
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '0 0 0 100',
								editable	: true,
								enableKeyEvents : true,
								width		: 180,
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
							},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('', '실험담당자' ),
								name		: 'labr_drtr_name',
								pair		: 'labr_drtr_idcd',
								xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								margin		: '0 0 0 30',
								editable	: true,
								enableKeyEvents : true,
								width		: 180,
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
							},{	name : 'labr_drtr_idcd', xtype	: 'textfield', hidden : true
							}

						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('', '거래처' ),
								name		: 'cstm_code',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 80,
								width		: 155,
								clearable	: false ,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											var panel1 = nameField.up('form');
											var layout = ('[name=smpl_info]');
											panel1.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
											nameField.setValue(records[0].get('cstm_code'));
											pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true,
							},{	fieldLabel	: Language.get('', '거래처명' ),
								name		: 'cstm_name',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 50,
								width		: 205,
							},{	fieldLabel	: Language.get('', '요청담당자' ),
								name		: 'cstm_drtr_name',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 180,
								margin		: '0 0 0 10'
							},{	xtype		: 'textfield',
								name		: 'tele_numb',
								vtype		: 'phone',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 110,
								emptyText	: '연락처.',
								margin		: '1 0 0 5',
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: '주소',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'post_code',
								pair		: '',
								allowBlank	: true,
								clearable	: false ,
								editable	: true,
								hidden		: false,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 155,
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
								},
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0.5 0 2 2', width : 393,hidden		: false,	readOnly	: true,
								fieldCls	: 'readonlyfield',
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	xtype		: 'textfield',
								name		: 'addr_2snd',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 465,
								readOnly	: false,
								hidden		: false,
								maxLength	: 100,
								maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
								margin		: '0 0 0 85'
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','용도'),
								xtype		: 'lookupfield',
								name		: 'smpl_usge_dvcd',
								width		: 190,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								lookupValue	: resource.lookup('smpl_usge_dvcd'),
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','품목코드'),
								xtype		: 'popupfield',
								name		: 'item_code',
								pair		: 'item_idcd',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 160,
								editable	: true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-item-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										var panel1 = nameField.up('form');
										var layout = ('[name=clam_info]');
										panel1.down('[name=item_name]').setValue(records[0].get('item_name'));
										panel1.down('[name=item_spec]').setValue(records[0].get('item_spec'));
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
							},{ fieldLabel	: Language.get('','품명'),
								xtype		: 'textfield',
								name		: 'item_name',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 50,
								width		: 300,
							},{ fieldLabel	: Language.get('','규격'),
								xtype		: 'textfield',
								name		: 'item_spec',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 50,
								width		: 270,
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','품목메모'),
								xtype		: 'textfield',
								name		: 'item_memo',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 730,
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: '요청수량',
								name		: 'reqt_qntt',
								xtype		: 'numericfield',
								itemId		: 'reqt_qntt',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 190,
								format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.###',
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: '공급가',
								name		: 'sply_amnt',
								xtype		: 'numericfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 190,
							},{	fieldLabel	: '부가세',
								name		: 'vatx_amnt',
								xtype		: 'numericfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 57,
								width		: 138,
							},{	fieldLabel	: '합계',
								name		: 'ttsm_amnt',
								xtype		: 'numericfield',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 57,
								width		: 138,
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{ fieldLabel	: '요청납기',
								xtype		: 'datefield',
								name		: 'deli_date',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 190,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','요청메모'),
								xtype		: 'textfield',
								name		: 'reqt_memo',
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 730,
							}
						]
					}
				]
			}
		;
		return item;
	}
});