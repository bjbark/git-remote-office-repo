Ext.define('module.sale.project.salework.view.SaleWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salework-lister-master',
	store		: 'module.sale.project.salework.store.SaleWorkMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	features	: [{ ftype : 'grid-summary' } ],
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
					{	text : '<span class="write-button">세금계산서</span>',    handler : me.iteminfo, cls: 'button1-style',itemId:'insert'	},
					'->',
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, handler : me.iteminfo, cls: 'button-style',itemId:'update' } ,
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
				items	: [
					{ dataIndex  : 'invc_numb'		, text : Language.get('publ_numb'		,'발행번호'	) , width :  110 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width :  100
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'차종명'		) , width : 120 , align : 'left'
					},{ dataIndex: 'invc_date'		, text : Language.get('publ_date'		,'발행일자'	) , width :  100 , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'담당자'		) , width :  100
					},{ dataIndex: 'sale_sale_amnt'	, text : Language.get('sale_sale_amnt'	,'계약금액'	) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{ dataIndex: 'sale_vatx_amnt'	, text : Language.get('sale_vatx_amnt'	,'부가세'		) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum',hidden:true
					},{ dataIndex: 'sale_ttsm_amnt'	, text : Language.get('sale_ttsm_amnt'	,'계산서금액'	) , width :  100 , xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'적요'		) , flex  :  1
					}
				]
			}
		;
		return item;
	},
	iteminfo : function () {
		var	me			= this
			listermaster  = Ext.ComponentQuery.query('module-salework-lister-master')[0],
			listerdetail  = Ext.ComponentQuery.query('module-salework-lister-detail')[0],
			record        = listermaster.getSelectionModel().getSelection()[0],
			listerpopup   = '', invc_numb     = '', cstm_name     = '',
			drtr_name     = '', cstm_idcd     = '', drtr_idcd     = '', lcls_idcd     = ''
		;
		if(me.itemId=='update'){
			if(record){
				invc_numb = record.get('invc_numb');
				cstm_name = record.get('cstm_name');
				drtr_name = record.get('drtr_name');
				cstm_idcd = record.get('cstm_idcd');
				drtr_idcd = record.get('drtr_idcd');
			}else{
				Ext.Msg.alert("알림","계산서를 선택해주세요.");
				return;
			}
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/listener/seq/maxid.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'sale_mast'
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
						invc_numb=result.records[0].seq;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/cust/cstmclass/get/search.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id	: _global.stor_id,
					find_name: '고객'
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
					if(result.records.length){
						lcls_idcd=result.records[0].clss_idcd;
					}
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
										{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cstm_name',
											labelWidth	: 80,
											width		: 180,
											pair		: 'cstm_idcd',
											value		: cstm_name,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' ,lcls_idcd:lcls_idcd},
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	fieldLabel	: Language.get('publ_date','발행일자'),
											name		: 'invc_date',
											xtype		: 'datefield',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											labelWidth	: 80,
											width		: 180,
											value		: new Date()
										},{	fieldLabel	: Language.get('drtr_name','담당자'),
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											labelWidth	: 80,
											value		: drtr_name,
											width		: 180,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' ,lcls_idcd : lcls_idcd},
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	xtype:'textfield', name:'drtr_idcd' , hidden:true, value : drtr_idcd
										},{	xtype:'textfield', name:'cstm_idcd' , hidden:true, value : cstm_idcd
										},{	xtype:'textfield', name:'item_idcd' , hidden:true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
									items	: [
										{	fieldLabel	: Language.get('sale_amnt','공급가'),
											name		: 'sale_amnt',
											xtype		: 'numericfield',
											labelWidth	: 80,
											width		: 180,
											readOnly	: true,
											fieldCls	: 'readonlyfield',
											listeners:{
												change:function(field,val){
													var vatx_amnt = form.down('[name=vatx_amnt]'),
														ttsm_amnt = form.down('[name=ttsm_amnt]')
													;
													var vatx_val = Math.floor(Math.floor(val/10)/10)+'0';
													vatx_amnt.setValue(vatx_val);
													ttsm_amnt.setValue( Math.floor((val+Number(vatx_val))/10)+'0');
												}
											}
										},{	fieldLabel	: Language.get('vatx_amnt','부가세'),
											name		: 'vatx_amnt',
											xtype		: 'numericfield',
											labelWidth	: 80,
											width		: 180,
											readOnly	: true,
											format		: '0,000',
											fieldCls	: 'readonlyfield'
										},{	fieldLabel	: Language.get('ttsm_amnt','합계'),
											name		: 'ttsm_amnt',
											xtype		: 'numericfield',
											labelWidth	: 80,
											width		: 180,
											readOnly	: true,
											fieldCls	: 'readonlyfield'
										}
									]
								},{	fieldLabel	: Language.get('remk_text','적요'),
											name		: 'remk_text',
											xtype		: 'textarea',
											labelWidth	: 80,
											width		: 540,
								}

							]
						}
					]
				},{	xtype : 'module-salework-lister-popup', region:'center' , flex : 1,
					listeners:{
						afterrender:function(){
							listerpopup =  Ext.ComponentQuery.query('module-salework-lister-popup')[0];   // 렌더 후 진행해야 lister을 찾아올 수 있음
							if(invc_numb){
								listerpopup.select({
									callback : function(records, operation, success) {
											if (success) {
											} else {}
										}, scope : me
								}, { invc_numb : invc_numb });
							}
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
							changes = store.data.items.length,
							button = this,
							updates = store.getUpdatedRecords().length,
							remove = store.removed.length
						;
						if(me.itemId == "insert"){
							if(changes ==0){
								Ext.Msg.alert("알림","수정사항이 없습니다.");
								return;
							}
						}else if( me.itemId == "update"){
							if(updates == 0 && remove == 0 ){
								var chk =0;
								if(changes >0 ){
									for (var int = 0; int < changes; int++) {
										if(store.data.items[int].data.modify == "Y"){
											chk=1;
										}
									}
								}
								if(!chk){
									Ext.Msg.alert("알림","수정사항이 없습니다.");
									return;
								}
							}
						}
						if(updates==0 && remove ==0){
							store.data.items[store.data.items.length-1].data.form_invc_numb = invc_numb;
							store.data.items[store.data.items.length-1].data.form_invc_date = params.invc_date;
							store.data.items[store.data.items.length-1].data.form_sale_amnt = params.sale_amnt[0];
							store.data.items[store.data.items.length-1].data.form_vatx_amnt = params.vatx_amnt;
							store.data.items[store.data.items.length-1].data.form_ttsm_amnt = params.ttsm_amnt;
							store.data.items[store.data.items.length-1].data.form_remk_text = params.remk_text;
							store.data.items[store.data.items.length-1].data.form_cstm_idcd = params.cstm_idcd;
							store.data.items[store.data.items.length-1].data.form_drtr_idcd = params.drtr_idcd;
							store.data.items[store.data.items.length-1].data.stor_id        = _global.stor_id;
							store.data.items[store.data.items.length-1].data.form_cstm_name = params.cstm_name;
						}else if(remove > 0 && updates==0){
							store.removed[0].data.form_invc_numb = mastInvc;
							store.removed[0].data.form_invc_date = params.invc_date;
							store.removed[0].data.form_sale_amnt = params.sale_amnt[0];
							store.removed[0].data.form_vatx_amnt = params.vatx_amnt;
							store.removed[0].data.form_ttsm_amnt = params.ttsm_amnt;
							store.removed[0].data.form_remk_text = params.remk_text;
							store.removed[0].data.form_cstm_idcd = params.cstm_idcd;
							store.removed[0].data.form_drtr_idcd = params.drtr_idcd;
							store.removed[0].data.stor_id        = _global.stor_id;
							store.removed[0].data.form_cstm_name = params.cstm_name;
						}else{
							store.getUpdatedRecords()[0].data.form_invc_numb = mastInvc;
							store.getUpdatedRecords()[0].data.form_invc_date = params.invc_date;
							store.getUpdatedRecords()[0].data.form_sale_amnt = params.sale_amnt[0];
							store.getUpdatedRecords()[0].data.form_vatx_amnt = params.vatx_amnt;
							store.getUpdatedRecords()[0].data.form_ttsm_amnt = params.ttsm_amnt;
							store.getUpdatedRecords()[0].data.form_remk_text = params.remk_text;
							store.getUpdatedRecords()[0].data.form_cstm_idcd = params.cstm_idcd;
							store.getUpdatedRecords()[0].data.form_drtr_idcd = params.drtr_idcd;
							store.getUpdatedRecords()[0].data.stor_id        = _global.stor_id;
							store.getUpdatedRecords()[0].data.form_cstm_name = params.cstm_name;
						}
						store.sync({
							success : function(operation){ },
							failure : function(operation){ },
							callback: function(operation){
							}
						});
						this.up('form').getForm().reset();

						this.up('window').hide();
						var search = Ext.ComponentQuery.query('module-salework-search')[0],
							param  = search.getValues()
						;
						setTimeout(function() {
							listermaster.select({
								callback:function(records, operation, success) {
								if (success) {
								} else { me.pocket.editor().getForm().reset(true);}
								}, scope:me
							}, Ext.merge( param, {stor_id : _global.stor_id}) );
							if(me.itemId=="update"){
								listerdetail.select({
									callback:function(records, operation, success) {
										if (success) {
											listerdetail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {stor_id : _global.stor_id,invc_numb : invc_numb}) );
							}
						},500);
					}
				},{	text	: Const.CLOSER.text,
					cls		: 'button-style',
					handler	: function() {
						var store = listerpopup.getStore();

						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">세금계산서 발행</span>',
			closeAction	: 'hide',
			width		: 580,
			height		: 700,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: '',
			listeners:{
				hide:function(){
					var store  = listerpopup.getStore()
					;
					store.clearData();
					store.loadData([],false);

				}
			}
		});
		win.show();
		win.tools.close.hide ();

	},
});