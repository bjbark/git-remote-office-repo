Ext.define('module.custom.sjflv.oms.omsmast.view.OmsMastEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-omsmast-editor',
	title	: Language.get('smpl_info','의뢰 등록'),
	height	: 313,
	layout	: {
	type: 'border'
	},

	collapsible 	: true			,
	collapsed		: true			,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
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
//				dock			: 'left',
//				width			: 770,
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
//								fieldCls	: 'requiredindex',
								width		: 210,
//								allowBlank	: false,
								fieldCls	: 'requiredindex',
//								emptyText	: Const.invalid.emptyValue,
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '1 0 0 5',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: '접수일자',
								xtype		: 'datefield',
								name		: 'invc_date',
								margin		: '0 0 0 30',
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	fieldLabel	: Language.get('', '작성자' ),
								name		: 'cstm_drtr_name',
								xtype		: 'textfield',
								width		: 180,
								margin		: '0 0 0 60',
							},{	fieldLabel	: Language.get('', '작성자' ),
								name		: 'cstm_drtr_idcd',
								xtype		: 'textfield',
								width		: 180,
								margin		: '0 0 0 60',
								hidden		: true,
							},
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
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 80,
								width		: 210,
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
								labelWidth	: 50,
								width		: 220,
								margin		: '0 0 0 120',
							},{	fieldLabel	: Language.get('', '연락처' ),
								xtype		: 'textfield',
								name		: 'tele_numb',
								vtype		: 'phone',
								width		: 180,
								margin		: '0 0 0 -10',
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
							},{	name	: 'addr_1fst' ,  xtype  : 'textfield' ,  margin : '0.5 0 2 2', width : 393,hidden		: false,
							}
						]
					},{	xtype	: 'panel',
						layout	: 'hbox',
						border	: 0,
						margin	: '5 0 0 0',
						items	: [
							{	xtype		: 'textfield',
								name		: 'addr_2snd',
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
								lookupValue	: resource.lookup('smpl_usge_dvcd'),
							},{	fieldLabel	: Language.get('','진행상태'),
								xtype		: 'lookupfield',
								name		: 'smpl_stat_dvcd',
								hidden		: true,
								width		: 190,
								lookupValue	: resource.lookup('smpl_stat_dvcd'),
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
								width		: 210,
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
								labelWidth	: 50,
								width		: 270,
							},{ fieldLabel	: Language.get('','규격'),
								xtype		: 'textfield',
								name		: 'item_spec',
								labelWidth	: 50,
								width		: 240,
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
								width		: 210,
							},
							{ fieldLabel	: '요청납기',
								xtype		: 'datefield',
								name		: 'deli_date',
								width		: 180,
								margin		: '0 0 0 85',
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
								width		: 730,
							}
						]
					}
				]
			}
		;
		return item;
	},
});