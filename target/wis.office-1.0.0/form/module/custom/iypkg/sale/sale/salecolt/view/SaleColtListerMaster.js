Ext.define('module.custom.iypkg.sale.sale.salecolt.view.SaleColtListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-iypkg-salecolt-lister-master',
	store		: 'module.custom.iypkg.sale.sale.salecolt.store.SaleColtMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'-',
					{	text : '<span class="write-button">수금보고</span>',    handler : me.iteminfo, cls: 'button1-style'	},
					'->',
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_numb'	, text : Language.get('sale_numb'	,'매출번호'		) , width : 110 , align : 'center'
					},{	dataIndex: 'invc_date'	, text : Language.get('publ_date'	,'발행일자'		) , width : 100 , align : 'center'
					},{	dataIndex: 'remk_text'	, text : Language.get('remk_text'	,'적요'	) , flex  : 100 , align : 'left'
					},{	dataIndex: 'sale_amnt'	, text : Language.get('sale_amnt'	,'공급가'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'vatx_amnt'	, text : Language.get('vatx_amnt'	,'부가세'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'합계금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum',
					},{	dataIndex: 'yotp_amnt'	, text : Language.get('yotp_amnt'	,'수금액'		) , width : 100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ostd_amnt'	, text : Language.get('ostd_amnt'	,'미수잔액'		) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , width : 200 ,  align : 'center'
					}
				]
			}
		;
		return item;
	},
	iteminfo : function () {
		var	me			= this
			listermaster  = Ext.ComponentQuery.query('module-iypkg-salecolt-lister-master')[0],
			record        = listermaster.getSelectionModel().getSelection()[0],
			listerpopup = '',
			mastInvc     = ''
		;
		if(record){
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'colt_mast'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						mastInvc=result.records[0].seq;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			var form = Ext.widget('form', {
				border         : false,
				itemId         : 'info',
				name           : 'popup_form',
				layout         : 'border',
				bodyPadding    : 5,
				fieldDefaults  : {
					labelWidth : 150,
					labelStyle : 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', region:'north',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
										items	: [
											{	fieldLabel	: Language.get('invc_numb','매출번호'),
												name		: 'invc_numb',
												xtype		: 'textfield',
												labelWidth	: 60,
												width		: 180,
												value		: record.get('invc_numb'),
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												cls			: 'textTemp',
												hidden		: true
											},{	fieldLabel	: Language.get('mastInvc','수금번호'),
												name		: 'mastInvc',
												xtype		: 'textfield',
												labelWidth	: 60,
												width		: 180,
												value		: mastInvc,
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												cls			: 'textTemp'
											},{	fieldLabel	: Language.get('iput_amnt_date','입금일자'),
												name		: 'iput_amnt_date',
												xtype		: 'datefield',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												labelWidth	: 60,
												width		: 180,
												value		: new Date()
											},{	fieldLabel	: Language.get('stot_dvcd','결제구분'),
												name		: 'stot_dvcd',
												xtype		: 'lookupfield',
												labelWidth	: 60,
												width		: 180,
												lookupValue	: resource.lookup('stot_dvcd'),
												listeners:{
													change:function(field,value){
														if(value == 4){
															form.down('[name=extra_field]').show();
														}else{
															form.down('[name=extra_field]').hide();
														}
													}
												}
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
										items	: [
											{	fieldLabel	: Language.get('drtr_name','담당자'),
												name		: 'user_name',
												pair		: 'drtr_idcd',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												value		: record.get('user_name'),
												labelWidth	: 60,
												width		: 180,
												popup		: {
													select	: 'SINGLE',
													widget	: 'lookup-user-popup',
													params	: { stor_grp : _global.stor_grp , line_stat : '0' },
													result	: function(records, nameField, pairField) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	fieldLabel	: Language.get('dept_name','담당부서'),
												name		: 'dept_name',
												pair		: 'dept_idcd',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												labelWidth	: 60,
												width		: 180,
												popup		: {
													select	: 'SINGLE',
													widget	: 'lookup-dept-popup',
													params	: { stor_grp : _global.stor_grp , line_stat : '0' },
													result	: function(records, nameField, pairField) {
														nameField.setValue(records[0].get('dept_name'));
														pairField.setValue(records[0].get('dept_idcd'));
													}
												}
											},{	xtype:'textfield', name:'drtr_idcd' , hidden:true, value : record.get('drtr_idcd'),
											},{	xtype:'textfield', name:'dept_idcd' , hidden:true
											},{	xtype:'textfield', name:'cstm_idcd' , hidden:true , value : record.get('cstm_idcd')
											},{	fieldLabel	: Language.get('stot_bass','결제근거'),
												name		: 'stot_bass',
												xtype		: 'textfield',
												labelWidth	: 60,
												width		: 180,
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, name : 'extra_field', hidden:true,
										items	: [
											{	fieldLabel	: Language.get('publ_date','발행일자'),
												name		: 'publ_date',
												xtype		: 'datefield',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												labelWidth	: 60,
												width		: 180,
												value		: new Date()
											},{	fieldLabel	: Language.get('expr_date','만기일자'),
												name		: 'expr_date',
												xtype		: 'datefield',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												labelWidth	: 60,
												width		: 180,
												value		: new Date()
											},{	fieldLabel	: Language.get('paym_bank_name','은행명'),
												name		: 'paym_bank_name',
												xtype		: 'textfield',
												labelWidth	: 60,
												width		: 180,
											}
										]
									}
								]
							}
						]
					},{	xtype : 'module-iypkg-salecolt-lister-popup', region:'center' , flex : 1,
						listeners:{
							afterrender:function(){
								listerpopup = Ext.ComponentQuery.query('module-iypkg-salecolt-lister-popup')[0] ;   // 렌더 후 진행해야 lister을 찾아올 수 있음
								listerpopup.select({
									callback : function(records, operation, success) {
											if (success) {
											} else {}
										}, scope : me
								}, { invc_numb : record.get('invc_numb') });
							}
						}
					}
				],
				buttons: [
					{	text	: Const.FINISH.text,
						cls		: 'button-style',
						handler	: function() {
							var store = listerpopup.getStore(),
								params = form.getValues(),
								changes = store.getUpdatedRecords().length,
								button = this
							;
							if(params.iput_amnt_date ==''){
								Ext.Msg.alert("알림","입금일자가 없습니다.");
								return;
							}
							if(params.stot_dvcd ==''){
								Ext.Msg.alert("알림","결제구분이 없습니다.");
								return;
							}
							if(changes != 0){

								store.getUpdatedRecords()[0].data.form_invc_numb      = mastInvc;
								store.getUpdatedRecords()[0].data.form_cstm_idcd      = params.cstm_idcd;
								store.getUpdatedRecords()[0].data.form_drtr_idcd      = params.drtr_idcd;
								store.getUpdatedRecords()[0].data.form_dept_idcd      = params.dept_idcd;
								store.getUpdatedRecords()[0].data.form_iput_amnt_date = params.iput_amnt_date;
								store.getUpdatedRecords()[0].data.form_stot_dvcd      = params.stot_dvcd;
								store.getUpdatedRecords()[0].data.form_stot_bass      = params.stot_bass;
								if(params.stot_dvcd == 4){
									store.getUpdatedRecords()[0].data.form_publ_date      = params.publ_date;
									store.getUpdatedRecords()[0].data.form_expr_date      = params.expr_date;
									store.getUpdatedRecords()[0].data.form_paym_bank_name = params.paym_bank_name;
								}
								store.sync({
									success : function(operation){ },
									failure : function(operation){ },
									callback: function(operation){
										listermaster.getStore().reload();
									}
								});
								this.up('form').getForm().reset();

								this.up('window').hide();
							}else{
								Ext.Msg.alert("알림","수정사항이 없습니다.");
							}
						}
					},{	text	: Const.CLOSER.text,
						cls		: 'button-style',
						handler	: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});


			win = Ext.widget('window', {
				title		: '<span class="btnTemp" style="font-size:15px; color:black;">수금보고</span>',
				closeAction	: 'hide',
				width		: 580,
				height		: 700,
				layout		: 'fit',
				resizable	: true,
				modal		: true,
				items		: form,
				defaultFocus: ''
			});
			win.show();
		}else{
			Ext.Msg.alert('알림',  '계산서를 선택해주세요.' );
		}

	},
});