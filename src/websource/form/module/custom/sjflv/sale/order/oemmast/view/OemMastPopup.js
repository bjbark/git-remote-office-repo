Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sjflv-oemmast-popup',

	title		: '입고등록',
	closable	: true,
	autoShow	: true,
	width		: 270 ,
	height		: 240,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.UPDATE.text, iconCls: Const.UPDATE.icon , scope: me, handler: me.finishAction	,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close			,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			width	: 200,
			margin	: '15 7 0 10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	fieldLabel	: '입고일자',
							xtype 		: 'datefield',
							name		: 'invc_date',
							margin		: '10 0 0 0',
							value		: new Date(),
							width		: 165,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						}
					]
				},{	fieldLabel	: '입고수량',
					xtype		: 'numericfield',
					name		: 'istt_qntt',
					margin		: '10 0 0 0',
					fieldCls	: 'requiredindex',
					width		: 100
				},{ fieldLabel	: 'bach번호',
					xtype		: 'textfield',
					name		: 'lott_numb',
					margin		: '10 0 0 0',
					width		: 165,
					fieldCls	: 'requiredindex',
				},{ fieldLabel	: Language.get('', '입고창고'),
					name		: 'istt_wrhs_name',
					pair		: 'istt_wrhs_idcd',
					xtype		: 'popupfield',
					margin		: '10 0 0 0',
					fieldCls	: 'requiredindex',
					editable	: true,
					enableKeyEvents : true,
					emptyText	: '',
					width		: 165,
					clearable	: true,
					popup		: {
						widget	: 'lookup-wrhs-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0' },
						result	: function(records, nameField, pairField ) {
							nameField.setValue(records[0].get('wrhs_name'));
							pairField.setValue(records[0].get('wrhs_idcd'));
						}
					},
					value		: '제품창고'
				},{	xtype	: 'textfield',name 	: 'istt_wrhs_idcd', value : '01' 					  ,hidden	: true,
				},{	xtype	: 'textfield',name 	: 'acct_bacd', 		value : me.popup.params.acct_bacd ,hidden	: true
				},{	xtype	: 'textfield',name 	: 'unit_idcd', 		value : me.popup.params.unit_idcd ,hidden	: true
				},{	xtype	: 'textfield',name 	: 'cstm_idcd', 		value : me.popup.params.cstm_idcd ,hidden	: true
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
			var me = this,
				baseform= me.down('form'),
				store	= Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0].getStore(),
				master	= Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0],
				select	= master.getSelectionModel().getSelection(),
				record2	= master.getSelectionModel().getSelection()[0],
				record	= baseform.getRecord(),
				values	= baseform.getValues()
				count	= 0
			;
//			for(var i in values){
//				if(values[i]==""){
//					Ext.Msg.confirm('확인', '누락된 필수 입력 값이 있습니다.<br> 모든 필드를 입력해주세요.', function(btn) {
//						if (btn === 'yes') {
//							return
//						} else {
//							return
//						}
//					});
//					count++;
//				}
//			}
			if(values.istt_qntt==''||values.istt_qntt==null){
				Ext.Msg.alert("알림","입고수량을 반드시 입력해주십시오.");
			}else if(values.lott_numb==''||values.lott_numb==null){
				Ext.Msg.alert("알림","batch 번호를 반드시 입력해주십시오.");
			}else if(values.istt_wrhs_idcd==''||values.istt_wrhs_idcd==null){
				Ext.Msg.alert("알림","입고창고를 반드시 선택해주십시오.");
			}else{
				if(count==0){
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/sale/order/oemmast/get/lottnumb.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							lott_numb	: values.lott_numb,
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
							if(result.records[0].count > 0){
								resource.showError( '이미 등록된batch 번호 입니다. 다시입력해주세요.'  );
								return;
							}
						}
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'isos_book'
								})
							 },
							async  : false,
							callback : function(keygen) {
								if (keygen.success) {
									new_invc_numb = keygen.records[0].seq;
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						})
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/sale/order/oemmast/set/istt.do',
								params	: {
								token	: _global.token_id,
								param	: JSON.stringify({
										new_invc_numb	: new_invc_numb,
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_seqn		: record.get('line_seqn'),
										bzpl_idcd		: '001',
										invc_dvcd		: '1800',
										stok_type_dvcd	: '1',
										invc_date 		: values.invc_date,
										istt_wrhs_idcd	: values.istt_wrhs_idcd,
										item_idcd		: record.get('item_idcd'),
										item_code		: record.get('item_code'),
										item_name		: record.get('item_name'),
										item_spec		: record.get('item_spec'),
										lott_numb		: values.lott_numb,
										istt_qntt		: values.istt_qntt,
										drtr_idcd		: _global.login_id,
										acct_bacd		: record.get('acct_bacd'),
										unit_idcd		: record.get('unit_idcd'),
										cstm_idcd		: record.get('cstm_idcd'),
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									master.getStore().reload();
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
										mask.show();
										master.select({
											 callback : function(records, operation, success) {
												if (success) {
												} else {}
												mask.hide();
											}, scope : me
										});
										me.hide();
									}
									Ext.Msg.alert("알림", "입고 처리가 되었습니다.");
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									//mask.hide();
								}
							});
						})
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						//mask.hide();
						store.reload();
					}
				});
			}
		}
	}
});
