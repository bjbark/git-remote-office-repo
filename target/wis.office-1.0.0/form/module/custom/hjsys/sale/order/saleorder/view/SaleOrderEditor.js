Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-saleorder-editor',

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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	fieldLabel	: '고객명',
						xtype		: 'popupfield',
						editable	: false,
						enableKeyEvents : true,
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						clearable	: false ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-cstm-popup3',
							params	: { stor_grp : _global.stor_grp, line_stat : '0', sale_cstm_yorn : '1'},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
								me.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));
							}
						},
						listeners	: {
							blur	: function(field){
								var invc_date = me.down('[name=invc_date]').rawValue;
								var invc_numb = me.down('[name=invc_numb]').getValue();
								var cstm_idcd = me.down('[name=cstm_idcd]').getValue();
								if(cstm_idcd == '' || cstm_idcd == null){
									return;
								}
									if(invc_date != ''){
										var invc_date = invc_date.replace(/\-/g,'');
									// 수주번호 생성
										if(_global.hqof_idcd.toUpperCase()=="N1000HJSYS"){
											Ext.Ajax.request({
												url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/saleorder/get/invc.do',
												method		: "POST",
												params		: {
												 	token	: _global.token_id,
												 	param	: JSON.stringify({
														stor_id		: _global.stor_id,
														table_nm	: 'acpt_mast',
														cstm_idcd	: cstm_idcd,
														invc_date	: invc_date,
													})
												},
												async : false,
												success : function(response, request) {
													var result = Ext.decode(response.responseText);
													if	(!result.success ){
														Ext.Msg.error(result.message );
														return;
													} else{
														if(result.records.length >0){
															me.down('[name=invc_numb]').setValue(result.records[0].invc_numb);
														}
													}
												},
												failure : function(response, request) {
												},
												callback : function() {
												}
											});
										}else{
											Ext.Ajax.request({
												url			: _global.location.http() + '/listener/seq/maxid.do',
												params		: {
													token	: _global.token_id ,
													param	: JSON.stringify({
														stor_id	: _global.stor_id,
														table_nm: 'acpt_mast'
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request) {
													var result = Ext.decode(response.responseText);
													me.down('[name=invc_numb]').setValue(result.records[0].seq);
												}
											});
										}
									}
							}
						}
					},{	xtype	: 'textfield', name : 'cstm_code', hidden : true
					},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true,
					},{	fieldLabel	: '납품처',
						xtype		: 'textfield',
						name		: 'dlvy_cstm_name',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acpt_date','수주일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200,
//								editable	: false,
								listeners	: {
//									blur	: function(field){
//										var invc_numb = me.down('[name=invc_numb]').getValue();
//										var cstm_idcd = me.down('[name=cstm_idcd]').getValue();
//											if(cstm_idcd != ''){
//												var invc_date = field.rawValue.replace(/\-/g,'');
//											// 수주번호 생성
//												if(invc_date != '' ){
//												Ext.Ajax.request({
//													url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/saleorder/get/invc.do',
//													method		: "POST",
//													params		: {
//													 	token	: _global.token_id,
//													 	param	: JSON.stringify({
//															stor_id		: _global.stor_id,
//															table_nm	: 'acpt_mast',
//															cstm_idcd	: cstm_idcd,
//															invc_date	: invc_date,
//														})
//													},
//													async : false,
//													success : function(response, request) {
//														var result = Ext.decode(response.responseText);
//														if	(!result.success ){
//															Ext.Msg.error(result.message );
//															return;
//														} else{
//															if(result.records.length >0){
//																me.down('[name=invc_numb]').setValue(result.records[0].invc_numb);
//															}
//														}
//													},
//													failure : function(response, request) {
//													},
//													callback : function() {
//													}
//												});
//											}
//										}
//									}
								}
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'datefield',
								name		: 'deli_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('invc_numb','수주번호'),
								name		: 'invc_numb',
								xtype		: 'textfield',
								allowBlank	: false,
								readOnly	: (_global.hqof_idcd.toUpperCase()=="N1000WONTC"?false:true),
								fieldCls	: (_global.hqof_idcd.toUpperCase()=="N1000WONTC"?'':'readonlyfield'),
							}
						]
					},{	xtype	: 'textfield', name : 'item_idcd', hidden : true
					},{	xtype	: 'textfield', name : 'modify'   , hidden : true
					},{	fieldLabel	: Language.get('modl_name','모델명'),
						xtype		: 'textfield',
						name		: 'modl_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acpt_qntt','수주수량'),
								xtype		: 'numericfield',
								name		: 'acpt_qntt',
								width		: 200,
								minValue	: 1
							},{	fieldLabel	: Language.get('unit_name','단위'),
								xtype		: 'popupfield',
								name		: 'unit_name',
								pair		: 'unit_idcd',
								width		: 200,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-unit-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								}
							},{	xtype		: 'textfield', name : 'unit_idcd', hidden : true
							},
						]
					},
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
							height		: 170,
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