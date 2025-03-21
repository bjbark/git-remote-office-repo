Ext.define('module.custom.aone.sale.order.sordercofm.SorderCofm', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.aone.sale.order.sordercofm.model.SorderCofmMaster',
		'module.custom.aone.sale.order.sordercofm.model.SorderCofmDetail',
		'module.custom.aone.sale.order.sordercofm.model.SorderCofmFile'
	],
	stores:[
		'module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster',
		'module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster2',
		'module.custom.aone.sale.order.sordercofm.store.SorderCofmDetail',
		'module.custom.aone.sale.order.sordercofm.store.SorderCofmFile'
	],
	views : [
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmLayout',
		/* 현황 */
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmSearch',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerMaster',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerMaster2',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerDetail',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerDetail2',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerDetail3',
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmListerDetail4',
		/* 작업 */
		'module.custom.aone.sale.order.sordercofm.view.SorderCofmLister2'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sordercofm-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sordercofm-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sordercofm-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sordercofm-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-ecomast-lister-master menuitem[action=okAction]'				: { click : me.okAction           }, /* 주문확정 */
			'module-ecomast-lister-master menuitem[action=okCancelAction]'			: { click : me.okCancelAction     }, /* 주문취소 */
			'module-sordercofm-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-sordercofm-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-sordercofm-lister-master2 button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-sordercofm-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-sordercofm-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sordercofm-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sordercofm-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-master')[0] },
			master2  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-master2')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-detail')[0] },
			detail2  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-detail2')[0] },
			detail3  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-detail3')[0] },
			detail4  : function () { return Ext.ComponentQuery.query('module-sordercofm-lister-detail4')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-sordercofm-copy-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-sordercofm-lister2')[0] }
	},

	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") == "1") {
					err_msg = "이미 확정되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "확정을 주문을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '변경하신 사항을 확정하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '1'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
//								url		: _global.location.http() + '/basic/item/eco/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										cofm_yorn		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									master.getStore().reload();
								}
							});
						})
					}
				}
			});
		}
	},

	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") != "1") {
					err_msg = "확정취소를 할 수 없는 상태입니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "확정 취소할 주문을 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '변경사항을 승인 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '0'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
//								url		: _global.location.http() + '/basic/item/eco/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										cofm_yorn		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									master.getStore().reload();
								}
							});
						})
					}
				}
			});
		}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister.master(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { m}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

	},

	selectDetail : function(grid, record) {
		var me = this,
			master2 = me.pocket.lister.master2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			master2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
//			lister2.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},



	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master()
		;
		if(select){
			console.log(select);
			if  (select.get('acpt_cofm_yorn') !== '0') {
				Ext.Msg.alert("알림", "이미 수주등록이 완료된 견적입니다.");
				return;
			}

			Ext.Msg.confirm("확인", "수주등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select.get('invc_numb'),
								deli_date	: select.get('deli_date'),
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							master.getStore().reload();
							Ext.Msg.alert("알림","등록이 완료 되었습니다.");
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
							me.pocket.lister.detail().getStore().loadData([],false);
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","등록할 주문을 선택해주십시오.");
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});
