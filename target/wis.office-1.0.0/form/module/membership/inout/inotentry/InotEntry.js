Ext.define('module.membership.inout.inotentry.InotEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
		'module.membership.inout.inotentry.model.InotEntry'
	],
	stores:
	[
		'module.membership.inout.inotentry.store.InotEntry'
	],
	views:
	[
		'module.membership.inout.inotentry.view.InotEntryLayout',
		'module.membership.inout.inotentry.view.InotEntrySearch',
		'module.membership.inout.inotentry.view.InotEntryLister',
		'module.membership.inout.inotentry.view.InotEntryEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inotentry-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-inotentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-inotentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-inotentry-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-inotentry-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-inotentry-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-inotentry-lister button[action=deleteAction]' : { click : me.deleteAction }, 	// 삭제
			'module-inotentry-lister button[action=okAction]' : { click : me.okAction }, 	// 방문처리
			'module-inotentry-lister button[action=nokAction]' : { click : me.nokAction }, 	// 방문처리
//			'module-inotentry-lister' : {
//				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
//			},
			'module-inotentry-lister' : { selectionchange: me.attachRecord },

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inotentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inotentry-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-inotentry-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-inotentry-editor')[0] },
	},

	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
					me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues();
		;

		if(record.length > 0){
			editor.selectRecord({ memolister : me.pocket.memolister(), record : record }, me);
		}
//			editor.selectRecord({ mngtlister : me.pocket.mngtlister(), record : record }, me);
	},


	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			param  = me.pocket.search().getValues();
		;
		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
		}else{
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true });
						me.pocket.layout().down('#master').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
//				prnt_idcd	: search.getValues().prnt_idcd,
//				emp_id		: _global.emp_id,
//				emp_nm		: _global.emp_nm
				resv_stat_dvcd : '1'
			}),
			disables : [me.pocket.layout().down('#master').setDisabled(true), me.pocket.search().setDisabled(true)],
			callback: function (results){
				if (results.success) {
					setTimeout(function(){
						editor.down('[name=mmbr_name]').focus(true , 10);
					},200);
					results.feedback({success : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		})
	},


	updateAction:function(a) {
		var me = this,
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor(),
			search	= me.pocket.search(),
			store	= lister.getStore(),
			param	= editor.getValues(),
			select	= lister.getSelectionModel().getSelection()[0],
			mmbr_idcd,mmbr_code,
			chk = 0,
			line_seqn = 0
		;
		if(param.mmbr_idcd==''|| param.mmbr_idcd==null){
			Ext.Msg.alert("알림","회원코드를 입력하여 주십시오.");
			return;
		}
		if(select){
			mmbr_idcd = select.get('mmbr_idcd');
			mmbr_code = select.get('mmbr_code');
		}

		if (param._set=='insert'||param.line_seqn==0){
			Ext.Ajax.request({
				url		: _global.location.http() + '/membership/inotentry/get/lastSeq.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						table_name	: 'inot',
						mmbr_idcd	: param.mmbr_idcd
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
						if(result.records.length>0){
							param.line_seqn = result.records[0].line_seqn;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		} else {
		}

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			callback : function(results, record ) {
//				record.set('hqof_idcd' , _global.hqof_idcd );
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({
						}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#master').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});

		mask.hide();
	},

	//취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues();
			memo   = me.pocket.memolister(),
			mngtlister = me.pocket.mngtlister()
		;

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.search().setDisabled(false);

			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : me.pocket.lister(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});

	},

	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},
	okAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			records = me.pocket.lister().getSelectionModel().getSelection(),
			store	= lister.getStore()

		;
		console.log(select);
		console.log(records);
		if(!select){
			Ext.Msg.alert("알림","방문처리할 예약사항을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				console.log(record);
				// 0:대기  1:예약 2:보류  3:방문  9:취소
				if (record.get("resv_stat_dvcd") == '2') {
					Ext.Msg.alert("알림", "방문처리할 수 없는 예약사항입니다.(보류 처리된 예약)");
					return;
				}
				if (record.get("resv_stat_dvcd") == '3') {
					Ext.Msg.alert("알림", "방문처리할 수 없는 예약사항입니다.(이미 방문 처리된 예약)");
					return;
				}
				if (record.get("resv_stat_dvcd") == '9') {
					Ext.Msg.alert("알림", "방문처리할 수 없는 예약사항입니다.(취소된 예약)");
					return;
				}
				if (record.get('line_clos') !== '0') {
					Ext.Msg.alert("알림", "방문처리할 수 없는 예약사항입니다.(마감된 예약)");
					return;
				}else{
					Ext.Msg.confirm("확인", "방문처리 하시겠습니까?", function(button) {
						if (button == 'yes') {
//							Ext.each(records, function(record) {
								console.log( record);
								Ext.Ajax.request({
									url			: _global.location.http() + '/membership/memberentry/set/inotok.do',
									method		: "POST",
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											mmbr_idcd	: record.get('mmbr_idcd'),
											line_seqn	: record.get('line_seqn'),
											ok_dvcd		: '3',
											proc_drtr_idcd : record.get('drtr_idcd'),
											qntt		: 1,
											proc_date	: record.get('resv_date').replace(/-/gi,""),
											proc_time	: record.get('resv_time'),
											stor_id		: _global.stor_id,
											hqof_idcd	: _global.hqof_idcd
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										Ext.Msg.alert("알림", "방문처리가 완료 되었습니다.");
										store.reload();
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
										store.loadData([],true);
									}
								});
//							});
						}
					});
				}
			});
		}
	},
	nokAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			records = me.pocket.lister().getSelectionModel().getSelection(),
			store	= lister.getStore()

		;
		console.log(select);
		console.log(records);
		if(!select){
			Ext.Msg.alert("알림","취소할 예약사항을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				console.log(record);
				// 0:대기  1:예약 2:보류  3:방문  9:취소
				if (record.get("resv_stat_dvcd") == '0') {
					Ext.Msg.alert("알림", "방문 취소처리할 수 없는 예약사항입니다.(대기중인 예약)");
					return;
				}
				if (record.get("resv_stat_dvcd") == '1') {
					Ext.Msg.alert("알림", "방문 취소처리할 수 없는 예약사항입니다.(예약상태)");
					return;
				}
				if (record.get("resv_stat_dvcd") == '2') {
					Ext.Msg.alert("알림", "방문 취소처리할 수 없는 예약사항입니다.(보류 처리된 예약)");
					return;
				}
				if (record.get("resv_stat_dvcd") == '9') {
					Ext.Msg.alert("알림", "방문 취소처리할 수 없는 예약사항입니다.(취소된 예약)");
					return;
				}
				if (record.get('line_clos') !== '0') {
					Ext.Msg.alert("알림", "방문 취소처리할 수 없는 예약사항입니다.(마감된 예약)");
					return;
				}else{
					Ext.Msg.confirm("확인", "방문취소처리 하시겠습니까?", function(button) {
						if (button == 'yes') {
//							Ext.each(records, function(record) {
								console.log( record);
								Ext.Ajax.request({
									url			: _global.location.http() + '/membership/memberentry/set/inotok.do',
									method		: "POST",
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											mmbr_idcd	: record.get('mmbr_idcd'),
											line_seqn	: record.get('line_seqn'),
											ok_dvcd		: '1',
											proc_drtr_idcd : '',
											qntt		: 0,
											proc_date	: '',
											proc_time	: '',
											stor_id		: _global.stor_id,
											hqof_idcd	: _global.hqof_idcd
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										Ext.Msg.alert("알림", "방문 취소처리가 완료 되었습니다.");
										store.reload();
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
										store.loadData([],true);
									}
								});
//							});
						}
					});
				}
			});
		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
