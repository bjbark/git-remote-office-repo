Ext.define('module.eis.project.arlist.ARList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.eis.project.arlist.model.ARListMaster',
		'module.eis.project.arlist.model.ARListDetail1'
	],
	stores	: [
		'module.eis.project.arlist.store.ARListMaster',
		'module.eis.project.arlist.store.ARListDetail1'
	],
	views	: [
		'module.eis.project.arlist.view.ARListLayout',
		'module.eis.project.arlist.view.ARListSearch',
		'module.eis.project.arlist.view.ARListListerMaster',
		'module.eis.project.arlist.view.ARListListerDetail11',
		'module.eis.project.arlist.view.ARListListerDetail12',
		'module.eis.project.arlist.view.ARListListerDetail21',
		'module.eis.project.arlist.view.ARListListerDetail22'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-arlist-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// lister detail event
			'module-arlist-lister-master  button[action=orderAction]'	: { click : me.orderAction1 },	// 지시사항 입력
			'module-arlist-lister-detail1 button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-arlist-lister-detail1 button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-arlist-lister-detail1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-arlist-lister-detail1 button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			'module-arlist-lister-detail1 button[action=changeAction]'	: { click : me.changeAction1 }, /* 설계일정 조정   */
			'module-arlist-lister-detail3 button[action=changeAction]'	: { click : me.changeAction2 }, /* 작업일정 조정   */
			// editer event
			'module-arlist-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-arlist-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-arlist-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-arlist-lister-detail1' : {
				selectionchange : me.attachRecord2
			},
			'module-arlist-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-arlist-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-arlist-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-arlist-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-arlist-lister-detail1')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-arlist-editor')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-arlist-order-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listerdetail.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;

		editor.modifyRecord({
			caller	: me,
			callback: function( results ){
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}me.pocket.layout().down('#mainpanel').setDisabled(true);
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
			sub = listerdetail.down('#sub').grid.store.data.length;
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'cvic_chck',
							invc_numb	: mrecord.get('cvic_idcd')
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listerdetail.getStore().model.modelName,{
								cvic_idcd :  mrecord.get('cvic_idcd'),
								cvic_name : mrecord.get('cvic_name'),
								line_seqn : sub+1
							}),
							listerdetail: listerdetail,
							disables	: [me.pocket.layout().down('#mainpanel')],
//							disables	: [me.pocket.layout().down('#itempanel')],
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
	},
	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cvic_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cvic_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cvic_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); },
					} );
				}
			},
			finished : function(results, record, operation){
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				if (results.success){
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
						}
				}
			}
		});
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	attachRecord2:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.listerdetail()
		;

		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.listerdetail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { cvic_idcd : record.get('cvic_idcd') });
		}
	},

	//삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		listerdetail = me.pocket.listerdetail();
		editor.deleteRecord({
			lister : me.pocket.listerdetail(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},
	changeAction1:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var search_url	= '/system/ganttchart/getGanttProjectDesign.do';
		var update_url	= '/system/ganttchart/setGanttProjectDesign.do';
		var invc_numb	= 'test project';

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '설계일정 관리',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\'}" width="100%" height="100%">iframe</iframe>',
					listeners : {
						show : function (win) {
							win.maximize ();
						},
						minimize: function(data) {
							win.setVisible(false);
							var a;
							var button = Ext.create('Ext.Button', {
								text: data.title,
								style: 'z-index: 9999!important',
								draggable :true,
								renderTo: Ext.getBody(),
								listeners : {
									move : function (e) {// dropped
										a = 1;
									},
									click : function(e) {
										if(a==1){
											x = button.getX();
											y = button.getY();
											temp = 1;
											a = 0;
											return;
										}else{
											win.setVisible(true);
											this.destroy();
										}
									}
								}
							});
							if(temp == 0){
								button.setX(200);
								button.setY(850);
							}else{
								button.setX(x);
								button.setY(y);
							}
						}
					}
			}); win.show();
		}
	},
	changeAction2:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var search_url	= '/system/ganttchart/getGanttProjectWork.do';
		var update_url	= '/system/ganttchart/setGanttProjectWork.do';
		var invc_numb	= 'test project';

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '설계일정 관리',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\'}" width="100%" height="100%">iframe</iframe>',
					listeners : {
						show : function (win) {
							win.maximize ();
						},
						minimize: function(data) {
							win.setVisible(false);
							var a;
							var button = Ext.create('Ext.Button', {
								text: data.title,
								style: 'z-index: 9999!important',
								draggable :true,
								renderTo: Ext.getBody(),
								listeners : {
									move : function (e) {// dropped
										a = 1;
									},
									click : function(e) {
										if(a==1){
											x = button.getX();
											y = button.getY();
											temp = 1;
											a = 0;
											return;
										}else{
											win.setVisible(true);
											this.destroy();
										}
									}
								}
							});
							if(temp == 0){
								button.setX(200);
								button.setY(850);
							}else{
								button.setX(x);
								button.setY(y);
							}
						}
					}
			}); win.show();
		}
	},
	orderAction1:function() {
		var me = this,
//			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
//		var records = master.getSelectionModel().getSelection();
//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
//			return;
//		}
		var me = this
		resource.loadPopup({
			widget : 'module-arlist-order-popup',
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});