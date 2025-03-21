Ext.define('module.custom.iypkg.prod.workentry.WorkEntry', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ItemPopupV3'
	],

	models:[
		'module.custom.iypkg.prod.workentry.model.WorkEntryDetail',
		'module.custom.iypkg.prod.workentry.model.WorkEntry',
		'module.custom.iypkg.prod.workentry.model.WorkEntry2',
		'module.custom.iypkg.prod.workentry.model.WorkEntryWrite',
		'module.custom.iypkg.prod.workentry.model.WorkEntryWriteBop',
	],
	stores:[
		'module.custom.iypkg.prod.workentry.store.WorkEntryDetail1',
		'module.custom.iypkg.prod.workentry.store.WorkEntryDetail2',
		'module.custom.iypkg.prod.workentry.store.WorkEntryMaster1',
		'module.custom.iypkg.prod.workentry.store.WorkEntryMaster2',
		'module.custom.iypkg.prod.workentry.store.WorkEntryMaster3',
		'module.custom.iypkg.prod.workentry.store.WorkEntryMaster4',
		'module.custom.iypkg.prod.workentry.store.WorkEntryWrite',
		'module.custom.iypkg.prod.workentry.store.WorkEntryWriteBop',
		'module.custom.iypkg.prod.workentry.store.WorkEntryFailLister',
		'module.custom.iypkg.prod.workentry.store.WorkEntryPoorLister',
	],
	views : [
		'module.custom.iypkg.prod.workentry.view.WorkEntryLayout',
		'module.custom.iypkg.prod.workentry.view.WorkEntrySearch',
		/* 작업 */
		'module.custom.iypkg.prod.workentry.view.WorkEntryDetail1',
		'module.custom.iypkg.prod.workentry.view.WorkEntryDetail2',
		'module.custom.iypkg.prod.workentry.view.WorkEntryMaster1',
		'module.custom.iypkg.prod.workentry.view.WorkEntryMaster2',
		'module.custom.iypkg.prod.workentry.view.WorkEntryMaster3',
		'module.custom.iypkg.prod.workentry.view.WorkEntryMaster4',
		'module.custom.iypkg.prod.workentry.view.WorkEntryWritePopup',
		'module.custom.iypkg.prod.workentry.view.WorkEntryWorkerEditor2',
		'module.custom.iypkg.prod.workentry.view.WorkEntryFailLister',
		'module.custom.iypkg.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.iypkg.prod.workentry.view.WorkEntryAddPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-workentry-layout #mainpanel'									: { tabchange : me.selectAction	},
			'module-workentry-layout  button[action=selectAction]'					: { click : me.selectAction        }, /* 조회 */

			'module-workentry-master1  button[action=exportAction]'					: { click : me.exportAction1       }, /* 엑셀 */
			'module-workentry-master2  button[action=exportAction]'					: { click : me.exportAction2       }, /* 엑셀 */
			'module-workentry-master2  button[action=modifyAction]'					: { click : me.modifyAction        }, /* 수정 */
			'module-workentry-master2  button[action=deleteAction]'					: { click : me.deleteAction        }, /* 삭제 */

			'module-workentry-master3  button[action=allAction]'					: { click : me.allAction           }, /* 생산실적등록(일괄) */
			'module-workentry-master3  button[action=writeAction]'					: { click : me.writeAction         }, /* 생산실적등록 */
			'module-workentry-master3  button[action=exportAction]'					: { click : me.exportAction3       }, /* 엑셀 */
			'module-workentry-master4  button[action=exportAction]'					: { click : me.exportAction4       }, /* 엑셀 */
			'module-workentry-poor button[action=deleteAction]'						: { click : me.deletepoorAction	},	// 불량삭제
			'module-workentry-fail button[action=deleteAction]'						: { click : me.deletefailAction	},	// 유실삭제

			'module-workentry-master1'	: {
				selectionchange	: me.selectRecord
			},
			'module-workentry-master3'	: {
				selectionchange	: me.selectDetail
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workentry-search')[0] },
		master1 : function () { return Ext.ComponentQuery.query('module-workentry-master1')[0] },
		master2 : function () { return Ext.ComponentQuery.query('module-workentry-master2')[0] },
		master3 : function () { return Ext.ComponentQuery.query('module-workentry-master3')[0] },
		master4 : function () { return Ext.ComponentQuery.query('module-workentry-master4')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-workentry-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-workentry-detail2')[0] },
		popup   : function () { return Ext.ComponentQuery.query('module-workentry-write-popup')[0] },
		poor    : function () { return Ext.ComponentQuery.query('module-workentry-poor')[0] },
		fail    : function () { return Ext.ComponentQuery.query('module-workentry-fail')[0] },
		workersearch1 : function () { return Ext.ComponentQuery.query('module-workentry-worker-search1')[0] },
		workersearch2 : function () { return Ext.ComponentQuery.query('module-workentry-worker-search2')[0] },
		workereditor2 : function () { return Ext.ComponentQuery.query('module-workentry-worker-editor2')[0] }
	},

	selectAction:function() {
		var me = this,
			master	= me.pocket.master1(),
			master3	= me.pocket.master3(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			detail1 = me.pocket.detail1(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});

		if(tindex==0){
			search.down('[name=invc_date1]').setFieldLabel('수주일자');
			mask.show();
			master.select({
				callback:function(records, operation, success) {
					if(success) {
						master.getSelectionModel().select(0);
					}else{}
					mask.hide();
				},scope:me
			}, Ext.merge(param, {stor_grp : _global.stor_grp }));
		}else
			if(tindex==1){
			search.down('[name=invc_date1]').setFieldLabel('지시일자');
			mask.show();
			master3.select({
				callback:function(records , operation, success){
					if(success) {
						master3.getSelectionModel().select(0);
					}else {}
					mask.hide();
				},scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			detail1 = me.pocket.detail1(),
			master2 = me.pocket.master2()
		;
		
		if (record[0]) {
			detail1.select({
				 callback : function(records, operation, success) {
					if (success) {
						detail1.getSelectionModel().select(0);
					} else {}
				}, scope : me
			}, Ext.merge( {invc_numb : record[0].data.invc_numb}) );
			master2.select({
				 callback : function(records, operation, success) {
					if (success) {
						detail1.getSelectionModel().select(0);
					} else {}
				}, scope : me
			}, Ext.merge( {invc_numb : record[0].data.invc_numb}) );
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
		master4 = me.pocket.master4(),
		detail2 = me.pocket.detail2(),
		workereditor2 = me.pocket.workereditor2()
		;

		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });

			master4.select({
				 callback : function(record, operation, success) {
					 master4.getSelectionModel().select(0);
					if (success) {
					} else {}
				}, scope : me
			},{ invc_numb : record[0].get('invc_numb') });

			detail2.select({
				 callback : function(record, operation, success) {
					if (success) {
						detail2.getSelectionModel().select(0);
					} else {}
				}, scope : me
			},{ invc_numb : record[0].get('invc_numb') });
			workereditor2.loadRecord(record[0]);
		}
	},

	//작업지시
	writeAction:function() {
		var me = this,
			master = me.pocket.master3(),
			select  = master.getSelectionModel().getSelection(),
			a = new Array(),
			b = new Array(),
			popup = Ext.ComponentQuery.query('module-workentry-write-popup')[0]
		;

		if(select.length == 0){
			Ext.Msg.alert("알림","실적 등록할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-workentry-write-popup',
				params : {
					invc_numb : select[0].data.invc_numb,
					dvcd      : 'insert'
				},
				result : function(records) {
					master.getStore().reload();
				}
			})
		}
		return;
	},

	//삭제
	deleteAction:function() {
		var me = this,
			master2 = me.pocket.master2(),
			detail1 = me.pocket.detail1(),
			store  = master2.getStore(),
			records = master2.getSelectionModel().getSelection()
		;

		if(records.length > 0){
			Ext.Msg.confirm("확인", "해당 실적 정보를 삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < records.length; i++) {
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workentry/set/del_yn.do',
							method		: "POST",
							params		: {
							 	token	: _global.token_id,
								param	: Ext.encode({
									invc_numb		: records[i].get('invc_numb'),
									wkod_numb		: records[i].get('wkod_numb'),
									wkod_seqn		: records[i].get('wkod_seqn')
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
								} else {
									Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
								}
							},
							failure : function(response, request) {
								resource.httpError(response);
							},
							callback : function() {
							}
						});
					}
					mask.hide();
					store.reload();


					detail1.getStore().clearData();
					detail1.getStore().loadData([],false);

					master1.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert("알림","삭제 할 실적을 선택해주십시오.");
		}
	},

	modifyAction : function(){
		var me = this,
			master2 = me.pocket.master2(),
			select  = master2.getSelectionModel().getSelection()
		;

		if(select.length == 0){
			Ext.Msg.alert("알림","수정할 실적 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-workentry-write-popup',
				params : {
					invc_numb : select[0].data.wkod_numb,
					dvcd      : 'modify'
				},
				result : function(records) {
				}
			})
		}
	},

	allAction : function(){
		var me = this,
			master = me.pocket.master3(),
			select = master.getSelectionModel().getSelection(),
			length = select.length,
			a = [], qntt = 0, n = 0
		;
		if(length > 0){
			for (var i = 0; i < length; i++) {
				a.push({ invc_numb : select[i].data.invc_numb,line_seqn:select[i].data.line_seqn});
			}

			resource.loadPopup({
				widget : 'module-workentry-add-popup',
				params : {
					invc_numb : a
				},
				result : function(records) {
					master.getStore().reload();
				}
			})
		}

	},

	//불량 삭제
	deletepoorAction : function() {
		var me = this,
			poor    = me.pocket.poor(),
			select  = poor.getSelectionModel().getSelection()[0],
			records = poor.getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","삭제할 불량내역을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv5/set/poordelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb	: record.raw.invc_numb,
										line_seqn	: record.raw.line_seqn
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									me.pocket.poor().getStore().reload();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						});
					}
				});
			});
		}
	},

	//유실 삭제
	deletefailAction : function() {
		var me = this,
			fail    = me.pocket.fail(),
			select  = fail.getSelectionModel().getSelection()[0],
			records = fail.getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","삭제할 유실내역을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv5/set/faildelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb	: record.raw.invc_numb,
										line_seqn	: record.raw.line_seqn
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									me.pocket.fail().getStore().reload();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						});
					}
				});
			});
		}
	},

	exportAction1 : function(self) {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self) {
		this.pocket.master2().writer({enableLoadMask:true});
	},


	exportAction3 : function(self) {
		this.pocket.master3().writer({enableLoadMask:true});
	},

	exportAction4 : function(self) {
		this.pocket.master4().writer({enableLoadMask:true});
	}
});
