Ext.define('module.custom.iypkg.sale.order.sptsmast.SptsMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CarPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.sale.order.sptsmast.model.SptsMast',
		'module.custom.iypkg.sale.order.sptsmast.model.SptsMastWorker',
	],
	stores:[
		'module.custom.iypkg.sale.order.sptsmast.store.SptsMast',
		'module.custom.iypkg.sale.order.sptsmast.store.SptsMastWorker',
	],
	views : [
		'module.custom.iypkg.sale.order.sptsmast.view.SptsMastLayout',
		'module.custom.iypkg.sale.order.sptsmast.view.SptsMastSearch',
		'module.custom.iypkg.sale.order.sptsmast.view.SptsMastLister',
		'module.custom.iypkg.sale.order.sptsmast.view.SptsMastWorkerLister',
		'module.custom.iypkg.sale.order.sptsmast.view.SptsMastWorkerSearch',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sptsmast-lister button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sptsmast-layout #mainpanel'									: { tabchange : me.selectAction 	},
			'module-sptsmast-layout button[action=selectAction]'				: { click : me.selectAction			}, /* 조회 */
			'module-sptsmast-lister button[action=exportAction]'				: { click : me.exportDetailAction	}, /* 엑셀 */
			'module-sptsmast-lister button[action=deleteAction]'				: { click : me.deleteAction			}, /* 조회 */
			'module-sptsmast-lister button[action=printAction]'					: { click : me.printAction			}, /* 출하계획서 출력 */

			'module-sptsmast-worker-lister button[action=orderAction]'			: { click : me.orderAction			}, /* 출하계획작성*/
			'module-sptsmast-worker-lister button[action=updateAction]'			: { click : me.updateAction			}, /* 저장*/
			'module-sptsmast-worker-lister button[action=cancelAction]'			: { click : me.cancelAction			}, /* 취소 */
			'module-sptsmast-worker-search button[action=selectAction2]'		: { click : me.selectAction2		}, /* 조회 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sptsmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sptsmast-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-sptsmast-lister')[0] },
		workerlister : function () { return Ext.ComponentQuery.query('module-sptsmast-worker-lister')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-sptsmast-worker-search')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==1){
			me.pocket.search().down('[name=collapsed]').expand();
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else{
			me.pocket.search().down('[name=collapsed]').collapse();
		}
	},


	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.workerlister(),
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			store  = lister.getStore()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

//		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
//		mask.show();
		store.load({
			params:{
				param:JSON.stringify({
					acpt_numb		: param.acpt_numb,
					cstm_idcd		: param.cstm_idcd,
					item_idcd		: param.item_idcd,
					drtr_idcd		: param.user_idcd,
					deli_date1		: param.deli_date1,
					deli_date2		: param.deli_date2,
					acpt_date1		: param.acpt_date1,
					acpt_date2		: param.acpt_date2,
					line_clos		: param.line_clos
				})
			}, scope:me,
			callback:function(records, operation, success) {
//				lister.getSelectionModel().select(0);
//				mask.hide();
			}
		});
	},

	//저장
	updateAction:function() {
		var me = this,
		lister = me.pocket.workerlister(),
		search  = me.pocket.workersearch(),
		param   = search.getValues(),
		changes = lister.getStore().getUpdatedRecords().length,
		new_invc_numb,
		plan_date = param.plan_date,
		tpanel = me.pocket.layout().down('#mainpanel')
	;

		if(param.plan_date == ''){
			Ext.Msg.alert("알림","계획일자를 입력해주십시오.");
			return;
		}

		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			Ext.Ajax.request({
				url : _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'ostt_plan'
					})
				},
				async	: false,
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					new_invc_numb = result.records[0].seq;
				}
			});
			var x = 1;	//순번
			for(var i=0;i<changes;i++){
				lister.getStore().getUpdatedRecords()[i].data.new_line_seqn = x++;
				lister.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
				lister.getStore().getUpdatedRecords()[i].data.plan_date = plan_date;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					lister.getStore().reload();
					search.getForm().reset(true);
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},


	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.workerlister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			select = lister.getStore().getUpdatedRecords().length
		;
		if(select){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.getStore().reload({
				callback: function(operation){
					mask.hide();
				}
			});
			search.getForm().reset(true);
		}
		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	printAction:function(){
		var	me      = this,
			search  = me.pocket.search(),
			records = search.getValues(),
			lister = Ext.ComponentQuery.query('module-sptsmast-lister')[0],
			record = lister.getSelectionModel().getSelection()
		;
		var	msg   = '',
			jrf   = 'dae-a_List.jrf',
			resId = _global.hq_id.toUpperCase(),
			chk   = ''
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/sale/order/sptsmast/set/updt.do',
			method		: "POST",
			params	: {
				token	: _global.token_id,
				param	: JSON.stringify({
						invc_numb	: record[0].get('invc_numb'),
						line_seqn	: record[0].get('line_seqn'),
//						updt_dttm	: record[i].get('updt_dttm'),
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				lister.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			mask.hide();
			}
		});

		if(records.invc_date1==''){
			msg = '조회기간을 입력해주세요.';
		}else if(records.invc_date2==''){
			msg = '조회기간을 입력해주세요.';
		}

		if(records.chk==''){
			chk = '[0]';
		}else{
			chk = records.chk;
		}
		if(msg != ''){
			Ext.Msg.alert('알림',msg);
			return;
		}
		var arg =	  'invc_date1~'+records.invc_date1+'~'
					+ 'invc_date2~'+records.invc_date2+'~'
					+ 'chk~'       +chk+'~'
		;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
	},


	//삭제
	deleteAction:function(){
		var me = this,
		lister = me.pocket.lister(),
		store  = lister.getStore()
	;

		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/sptsmast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn	: records[0].get('line_seqn')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});

	},

	orderAction:function(){
		var me	= this,
		workerlister= me.pocket.workerlister(),
		select		= me.pocket.workerlister().getSelectionModel().getSelection(),
		select2		= me.pocket.workerlister().getSelectionModel().getSelection()[0],
		record		= workerlister.getSelectionModel().getSelection(),
		checked		= 0,
		param	=''
		;
		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		for(var i=0;i <records.length;i++){
			if(records[i].get('plan_qntt')=="0"){
				Ext.Msg.alert("알림","계획량을  다시입력해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","출하계획작성할 목록을 선택해주십시오.");
			return;
		}else{
			if(!checked){
				var a =[];
				for(var i =0; i< record.length ; i++){
					a.push({invc_numb : record[i].get('invc_numb'),plan_qntt : record[i].get('plan_qntt')});
				}
				param = JSON.stringify({
					records		: a
				});
				Ext.Msg.confirm("확인", "출하계획작성 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/iypkg/sale/order/sptsmast/set/boxx_plan_insert.do',
							params	: {
								token : _global.token_id,
								param :  JSON.stringify({
									param			: param,
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
									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
									mask.show();
									workerlister.select({
										 callback : function(records, operation, success) {
											if (success) {
											} else {}
											mask.hide();
										}, scope : me
									});
									me.hide();
								}
								Ext.Msg.alert("알림", "출하계획작성이 완료 되었습니다.");
								workerlister.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}
	},
});
