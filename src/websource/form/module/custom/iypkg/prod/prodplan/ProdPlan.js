Ext.define('module.custom.iypkg.prod.prodplan.ProdPlan', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ItemPopupV3',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanAddPopup'
	],

	models:[
		'module.custom.iypkg.prod.prodplan.model.ProdPlan',
		'module.custom.iypkg.prod.prodplan.model.ProdPlanWrite',
		'module.custom.iypkg.prod.prodplan.model.ProdPlanWriteBop'
	],
	stores:[
		'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster2',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster3',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanMaster4',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanDetail',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanDetail3',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanWrite',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanWrite2',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanWriteBop',
		'module.custom.iypkg.prod.prodplan.store.ProdPlanWriteBop2'
	],
	views : [
		'module.custom.iypkg.prod.prodplan.view.ProdPlanLayout',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanSearch',
		/* 작업 */
		'module.custom.iypkg.prod.prodplan.view.ProdPlanDetail',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanDetail2',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanDetail3',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanDetail4',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanMaster',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanMaster2',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanMaster3',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanMaster4',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanWorkerSearch1',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanWorkerSearch2',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanWritePopup',
		'module.custom.iypkg.prod.prodplan.view.ProdPlanWritePopup2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodplan-layout #mainpanel'										: { tabchange : me.selectAction	},
			'module-prodplan-layout   button[action=selectAction]'					: { click : me.selectAction        }, /* 조회 */

			'module-prodplan-master  button[action=exportAction]'					: { click : me.exportAction1       }, /* 엑셀 */
			'module-prodplan-master  button[action=deleteAction]'					: { click : me.deleteAction        }, /* 삭제 */
			'module-prodplan-master  button[action=workAction]'						: { click : me.workAction          }, /* 생산계획작성 */
			'module-prodplan-master  button[action=workreportAction]'				: { click : me.workreportAction    }, /* 작업지시서 발행(리베엘지) */
			'module-prodplan-master  button[action=printAction]'					: { click : me.printAction         }, /* 작업지시서 발행(대아산업) */


			'module-prodplan-master2  button[action=exportAction]'					: { click : me.exportAction2       }, /* 엑셀 */
			'module-prodplan-master3  button[action=exportAction]'					: { click : me.exportAction3       }, /* 엑셀 */
			'module-prodplan-master3  button[action=dateAction]'					: { click : me.dateAction          }, /* 일정보기 */
			'module-prodplan-master3  button[action=allAction]'						: { click : me.allAction           }, /* 생산계획작성(일괄) */
			'module-prodplan-master3  button[action=workAction1]'					: { click : me.workAction1         }, /* 생산계획작성 */

			'module-prodplan-master4  button[action=exportAction]'					: { click : me.exportAction4       }, /* 엑셀 */
			'module-prodplan-detail   button[action=exportAction]'					: { click : me.exportActiondetail1 }, /* 엑셀 */
			'module-prodplan-detail3  button[action=exportAction]'					: { click : me.exportActiondetail3 }, /* 엑셀 */

			'module-prodplan-master'	: {
				selectionchange	: me.selectRecord
			},
			'module-prodplan-master3'	: {
				selectionchange	: me.selectDetail
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-prodplan-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-prodplan-search')[0] },
		master	: function () { return Ext.ComponentQuery.query('module-prodplan-master')[0] },
		master2	: function () { return Ext.ComponentQuery.query('module-prodplan-master2')[0] },
		master3	: function () { return Ext.ComponentQuery.query('module-prodplan-master3')[0] },
		master4	: function () { return Ext.ComponentQuery.query('module-prodplan-master4')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-prodplan-detail')[0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-prodplan-detail2')[0] },
		detail3	: function () { return Ext.ComponentQuery.query('module-prodplan-detail3')[0] },
		detail4	: function () { return Ext.ComponentQuery.query('module-prodplan-detail4')[0] },
		workersearch1 : function () { return Ext.ComponentQuery.query('module-prodplan-worker-search1')[0] },
		workersearch2 : function () { return Ext.ComponentQuery.query('module-prodplan-worker-search2')[0] },
		write	: function () { return Ext.ComponentQuery.query('module-prodplan-write-popup')[0]},
		add		: function () { return Ext.ComponentQuery.query('module-prodplan-add-popup')[0]}
	},

	selectAction:function() {
		var me = this,
			master	= me.pocket.master(),
			master3	= me.pocket.master3(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });

		if(tindex==0){
			search.down('[name=plan_sttm1]').show();
			search.down('[name=plan_sttm2]').show();
			search.down('[name=acpt_sttm1]').hide();
			search.down('[name=acpt_sttm2]').hide();

			mask.show();
			master.select({
				callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else if(tindex==1){
			search.down('[name=plan_sttm1]').hide();
			search.down('[name=plan_sttm2]').hide();
			search.down('[name=acpt_sttm1]').show();
			search.down('[name=acpt_sttm2]').show();

			master3.select({
				callback:function(records, operation, success) {
					if (success) {
						master3.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			master2 = me.pocket.master2(),
			detail = me.pocket.detail(),
			detail2 = me.pocket.detail2(),
			workersearch = me.pocket.workersearch1()
		;
		if (record.length > 0) {
			detail2.loadRecord(record[record.length-1]);
			workersearch.loadRecord(record[record.length-1]);

			master2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, Ext.merge( {stor_id : _global.stor_id, invc_numb : record[record.length-1].data.invc_numb}) );
			var invc = "";
			for (var i = 0; i < record.length; i++) {
				if(i == 0){
					invc += record[i].data.invc_numb;
				}else{
					invc += ','+record[i].data.invc_numb;
				}
			}
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, Ext.merge( {stor_id : _global.stor_id, invc_numb : invc}) );
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodplan/get/total.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: invc,
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					var editor = Ext.ComponentQuery.query('module-prodplan-detail2')[0],
						panel     = editor.down('form'),
						plan_qntt_01 = panel.down('[name=plan_qntt_01]'),
						plan_qntt_02 = panel.down('[name=plan_qntt_02]'),
						plan_qntt_03 = panel.down('[name=plan_qntt_03]'),
						plan_qntt_04 = panel.down('[name=plan_qntt_04]'),
						plan_qntt_05 = panel.down('[name=plan_qntt_05]')
						plan_qntt_06 = panel.down('[name=plan_qntt_06]'),
						plan_qntt_07 = panel.down('[name=plan_qntt_07]'),
						mxm2_qntt_01 = panel.down('[name=mxm2_qntt_01]'),
						mxm2_qntt_02 = panel.down('[name=mxm2_qntt_02]'),
						mxm2_qntt_03 = panel.down('[name=mxm2_qntt_03]'),
						mxm2_qntt_04 = panel.down('[name=mxm2_qntt_04]'),
						mxm2_qntt_05 = panel.down('[name=mxm2_qntt_05]'),
						mxm2_qntt_06 = panel.down('[name=mxm2_qntt_06]'),
						mxm2_qntt_07 = panel.down('[name=mxm2_qntt_07]')
					;
					if (result.success) {
						if(result.records.length > 0 ){
							var select = result.records;
							for (var i = 0; i < select.length; i++) {
								var plan_qntt = select[i].plan_qntt,
									mxm2      = Math.round(select[i].mxm2)
								;
								switch (select[i].wkct_name) {
								case '재단':
									plan_qntt_01.setValue(plan_qntt)
									mxm2_qntt_01.setValue(mxm2)
									break;
								case '인쇄':
									plan_qntt_02.setValue(plan_qntt)
									mxm2_qntt_02.setValue(mxm2)
									break;
								case '로타리':
									plan_qntt_03.setValue(plan_qntt)
									mxm2_qntt_03.setValue(mxm2)
									break;
								case '톰슨':
									plan_qntt_04.setValue(plan_qntt)
									mxm2_qntt_04.setValue(mxm2)
									break;
								case '접합':
									plan_qntt_05.setValue(plan_qntt)
									mxm2_qntt_05.setValue(mxm2)
									break;
								case '완제품':
									plan_qntt_06.setValue(plan_qntt)
									mxm2_qntt_06.setValue(mxm2)
									break;
								case '조립':
									plan_qntt_07.setValue(plan_qnt)
									mxm2_qntt_07.setValue(mxm2)
									break;
								default:
									break;
								}
							}
						}
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}else{
			workersearch.getForm().reset();

			master2.getStore().clearData();
			master2.getStore().loadData([],false);

			detail.getStore().clearData();
			detail.getStore().loadData([],false);
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
		master4 = me.pocket.master4(),
		detail3 = me.pocket.detail3(),
		detail4 = me.pocket.detail4(),
		workersearch = me.pocket.workersearch2(),
		select		= me.pocket.master2().getSelectionModel().getSelection()[0]
		;

		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			detail4.loadRecord(record[0]);
			workersearch.loadRecord(record[0]);
			master4.select({
				 callback : function(record, operation, success) {
					if (success) {
						master4.getSelectionModel().select(0);
					} else {}
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });

			detail3.select({
				 callback : function(record, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });
		}else{
			workersearch.getForm().reset();

			master4.getStore().clearData();
			master4.getStore().loadData([],false);

			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);
		}
	},

	dateAction:function() {

	},

	//삭제
	deleteAction:function() {
		var me = this,
			master	= me.pocket.master(),
			store  = master.getStore(),
			record	= master.getSelectionModel().getSelection(),
			select	= master.getSelectionModel().getSelection()
		;
		var records = master.getSelectionModel().getSelection();

		var a =[];

		for(var i =0; i< record.length ; i++){
			a.push({invc_numb : record[i].get('invc_numb')});
		}
		param = JSON.stringify({
				records		: a
			});

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodplan/set/del_yn.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							param		: param,
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd
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
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
					store.reload();
					master.getStore().reload();
					}
				});
			}
		});
	},

	//생산계획
	workAction:function() {
		var me = this,
			master = me.pocket.master(),
			select  = master.getSelectionModel().getSelection(),
			a = new Array(),
			b = new Array(),
			n = 0
		;
		var record = select[0];

		for(var i =0; i< select.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= select[i].get('invc_numb');
			if(i != select.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}

		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-prodplan-write-popup',
				params : {
					invc_numb : a
				},
				result : function(records) {
					master.getStore().reload();
				}
			})
		}
		return;
	},

	//생산계획
	workAction1:function() {
		var me = this,
			master = me.pocket.master3(),
			master4 = me.pocket.master4(),
			select  = master.getSelectionModel().getSelection(),
			select2 = master4.getSelectionModel().getSelection(),
			a = new Array(),
			b = new Array(), res = new Array(),
			n = 0
		;
		var record = select[0];
		var records = master4.getSelectionModel().getSelection();

		if (!records || records.length!=1){
			Ext.Msg.alert("알림","계획작성할 공정이 없습니다.");
			return;
		}

		//공정 같은지 확인
		for (var i = 0; i < select.length; i++) {
			if(i==0){
				a += "[";
			}
				a+= select[i].get('invc_numb');
			if(i != select.length -1){
				a+=",";
			}else{
				a+="]";
			}

			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodplan/get/master4.do',
				method		: "POST",
				async		: false,
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						invc_numb	: select[i].data.invc_numb
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					res[i] = result;
					if (result.success) {
					} else {
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}

		for (var j = 0; j < res.length; j++) {
			for (var k = 1; k < res[j].records.length; k++) {
				if(res[0].records[k].wkct_idcd != res[j].records[k].wkct_idcd){
					Ext.Msg.alert("알림","공정이 같은 수주건을 선택하여 주십시오.");
					return;
				}
			}
		}

		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-prodplan-write-popup2',
				params : {
					invc_numb : a
				},
				result : function(records) {
					master.getStore().reload();
				}
			})
		}
		return;
	},


	allAction : function(){
		var me = this,
			master = me.pocket.master3(),
//			master1= me.pocket.master1(),
			select = master.getSelectionModel().getSelection(),
			length = select.length,
			a = [], qntt = 0, n = 0
		;

		if(length > 0){
			//계획잔량 0인 수주건 막기
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					async: false,
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodplan/get/master4.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: record.get('invc_numb'),
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							for (var j = 0; j < result.records.length; j++) {
								qntt += result.records[j].not_qntt;
							}
						} else {
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});

				if(qntt == 0){
					n = 1;
					return false;
				}else{
					qntt = 0;
				}
			});

			if(n == 1){
				Ext.Msg.alert("알림","계획잔량이 0 이상인 수주건을 선택하여 주십시오.");
				return;
			}else{
				for (var i = 0; i < length; i++) {
					a.push({ invc_numb : select[i].data.invc_numb});
				}

				resource.loadPopup({
					widget : 'module-prodplan-add-popup',
					params : {
						invc_numb : a
					},
					result : function(records) {
//						master1.getStore().reload();
						master.getStore().reload();
					}
				})
			}
		}

	},

	//리베엘지 작업지시서 발행
	workreportAction:function() {
		var me = this,
			master = me.pocket.master(),
			select = me.pocket.master().getSelectionModel().getSelection(),
			jrf = 'workbook_liebe.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

//		Ext.Ajax.request({
//			url		: _global.location.http() + '/prod/order/prodorderv2/get/insp.do',
//			params	: {
//			token	: _global.token_id,
//			param	: JSON.stringify({
//					cstm_idcd		: records[0].get('cstm_idcd'),
//					rprt_dvcd		: "7000"
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else{
//					if(result.records.length >0){
//						jrf = result.records[0].rprt_file_name;
//					}
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});
		var a = "";
		for(var i =0; i< records.length ; i++){
			if(i==0){
				a += "[";
			}
				a += '{\'invc_numb\':\''+records[i].get('invc_numb')+'\'}';
//				a += '{\'invc_numb\':\''+records[i].get('invc_numb')+'\', \'path\' : \''+_global.img_http+'}';
			if(i != records.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = 'param~{\'records\':'+a+'}~';
		var arg = _param;

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;

	},


	printAction:function() {
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			select = master.getSelectionModel().getSelection()[0],
			param	= search.getValues(),
			jrf = 'daea_workbook.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";

		var arg = 'fr_invc_date~'+param.plan_sttm1+'~to_invc_date~'+param.plan_sttm2;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		Ext.Ajax.request({
			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
		});
//		}
	},

	exportAction1 : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},
	exportAction2 : function(self) {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function(self) {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction4 : function(self) {
		this.pocket.master4().writer({enableLoadMask:true});
	},
	exportActiondetail1 : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});
	},
	exportActiondetail3 : function(self) {
		this.pocket.detail3().writer({enableLoadMask:true});
	}
});
