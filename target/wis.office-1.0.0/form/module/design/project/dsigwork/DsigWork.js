Ext.define('module.design.project.dsigwork.DsigWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.UserPopup'
	],

	models	: [
		'module.design.project.dsigwork.model.DsigWorkMaster1',
		'module.design.project.dsigwork.model.DsigWorkMaster2',
		'module.design.project.dsigwork.model.DsigWorkDetail1',
		'module.design.project.dsigwork.model.DsigWorkDetail2'
	],
	stores	: [
		'module.design.project.dsigwork.store.DsigWorkMaster1',
		'module.design.project.dsigwork.store.DsigWorkMaster2',
		'module.design.project.dsigwork.store.DsigWorkDetail1',
		'module.design.project.dsigwork.store.DsigWorkDetail2'
	],
	views	: [
		'module.design.project.dsigwork.view.DsigWorkLayout',
		'module.design.project.dsigwork.view.DsigWorkSearch',
		'module.design.project.dsigwork.view.DsigWorkListerMaster1',
		'module.design.project.dsigwork.view.DsigWorkListerMaster2',
		'module.design.project.dsigwork.view.DsigWorkListerDetail1',
		'module.design.project.dsigwork.view.DsigWorkListerDetail2',
		'module.design.project.dsigwork.view.DsigWorkFinder',
		'module.design.project.dsigwork.view.DsigWorkReportPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dsigwork-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-dsigwork-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister detail event
			'module-dsigwork-lister-detail1 button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-dsigwork-lister-detail1 button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-dsigwork-lister-detail1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀

			'module-dsigwork-lister-detail1 button[action=reportAction]'	: { click : me.reportAction },  /* 실적보고   */
			'module-dsigwork-lister-detail1 button[action=approveAction]'	: { click : me.approveAction}, /* 승인   */
			'module-dsigwork-lister-detail1 button[action=approveCancel]'	: { click : me.approveCancel}, /* 승인취소   */
			'module-dsigwork-lister-detail2 button[action=exportAction]'	: { click : me.exportAction1},	// 엑셀
			'module-dsigwork-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			'module-dsigwork-lister-master2 button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			'module-dsigwork-lister-master2 button[action=reportAction]'	: { click : me.reportAction2 },	// 엑셀
			// editer event
			'module-dsigwork-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-dsigwork-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-dsigplan2-lister-master1' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-dsigwork-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-dsigwork-search')[0] },
		listermaster1: function () { return Ext.ComponentQuery.query('module-dsigwork-lister-master1')[0] },
		listermaster2: function () { return Ext.ComponentQuery.query('module-dsigwork-lister-master2')[0] },
		listerdetail1: function () { return Ext.ComponentQuery.query('module-dsigwork-lister-detail1')[0] },
		listerdetail2: function () { return Ext.ComponentQuery.query('module-dsigwork-lister-detail2')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-dsigwork-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-dsigwork-finder')[0] },
		reportpopup	: function () { return Ext.ComponentQuery.query('module-dsigwork-report-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listermaster2 = me.pocket.listermaster2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(search.getValues().pjod_idcd==''||search.getValues().pjod_idcd==null){
			Ext.Msg.alert("알림",Language.get('pjod_idcd', '금형번호')+"를 반드시 선택해주십시오.");
		}else if(param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","작업일자를 다시 선택해주십시오.");
		}else{
			if(tindex == 0){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				listerdetail1.select({
					callback:function(records, operation, success) {
						if (success) {
							listerdetail1.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id,pjod_idcd : param.pjod_idcd}) );
				listerdetail2.select({
					callback:function(records, operation, success) {
						if (success) {
							listerdetail2.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id,pjod_idcd : param.pjod_idcd}) );
			}else if(tindex == 1){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				listermaster2.select({
					callback:function(records, operation, success) {
						if (success) {
							listermaster2.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id,pjod_idcd : param.pjod_idcd}) );
			}
		}
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
		listermaster1= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster1.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},
	copyAction:function(){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			select = listerdetail1.getSelectionModel().getSelection()[0],
			store = listerdetail1.getStore(),
			plan_dvcd = 'dsig',
			finder = me.pocket.finder(),
			pjod_idcd = finder.down('[name=pjod_idcd]').getValue(),
			msg,
			chk
		;
		if(pjod_idcd){
			if(select){
				msg = '이미 처리된 일정계획입니다. 대일정을 가져오시겠습니까?';
			}else{
				msg = '대일정을 가져오시겠습니까?';
			}
			Ext.Msg.show({ title: '확인', msg: msg, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/dsigplan2/get/getPrint.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									invc_numb		: pjod_idcd,
									plan_dvcd		: plan_dvcd
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
									store.reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}else{
						return;
					}
				}
			});
		}else{
			Ext.Msg.error(Language.get('pjod_idcd', '금형번호')+'를 확인해주세요.');
		}
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
		var me				= this,
			listermaster2	= me.pocket.listermaster2(),
			store			= listermaster2.getStore(),
			select			= listermaster2.getSelectionModel().getSelection()
		;
		if(select.length > 0){
			store.remove(select);
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			store.sync({ // 저장 성공시
				success : function(operation){ }, // 저장 성공시
				failure : function(operation){ }, // 저장 실패시 호출
				callback: function(operation){ mask.hide(); } // 성공 실패 관계 없이 호출된다.
			});
		}
	},

	//실적보고
	reportAction:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			popup  = me.pocket.reportpopup()
		;
		var err_msg = "";
		var records = listerdetail1.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "세부 일정계획내역을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-dsigwork-report-popup',
		});
		var numb = Ext.ComponentQuery.query('#pjod_idcd')[0].setValue(records[0].data.pjod_idcd);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.seqn);
		var numb3 = Ext.ComponentQuery.query('#id')[0].setValue(records[0].data.id);
		var numb4 = Ext.ComponentQuery.query('#seqn')[0].setValue(records[0].data.seqn);
		var numb5 = Ext.ComponentQuery.query('#wker_name')[0].setValue(_global.login_nm);
		var numb6 = Ext.ComponentQuery.query('#wker_idcd')[0].setValue(_global.login_id);
		var numb7 = Ext.ComponentQuery.query('#invc_date')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb8 = Ext.ComponentQuery.query('#name')[0].setValue(records[0].data.name);
	},
	//실적보고수정
	reportAction2:function() {
		var me = this,
			listermaster2 = me.pocket.listermaster2(),
			popup  = me.pocket.reportpopup()
		;
		var err_msg = "";
		var records = listermaster2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "작업내역을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-dsigwork-report-popup',
		});
		var numb = Ext.ComponentQuery.query('#pjod_idcd')[0].setValue(records[0].data.pjod_idcd);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.seqn);
		var numb3 = Ext.ComponentQuery.query('#id')[0].setValue(records[0].data.id);
		var numb4 = Ext.ComponentQuery.query('#seqn')[0].setValue(records[0].data.seqn);
		var numb5 = Ext.ComponentQuery.query('#wker_name')[0].setValue(_global.login_nm);
		var numb6 = Ext.ComponentQuery.query('#wker_idcd')[0].setValue(_global.login_id);
		var numb7 = Ext.ComponentQuery.query('#invc_date')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb8 = Ext.ComponentQuery.query('#name')[0].setValue(records[0].data.name);
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

	//승인
	approveAction:function(){
		var me			= this,
			finder		= me.pocket.finder(),
			pjod_idcd	= finder.down('[name=pjod_idcd]').getValue()
			line_clos	= finder.down('[name=line_clos]')
		;
		Ext.Msg.show({ title: '확인', msg: '승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/design/dsigplan1/set/setApprove.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								pjod_idcd		: pjod_idcd,
								updt_idcd		: _global.login_id,
								line_clos		: '1'
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
								line_clos.setValue('1');
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}else{
					return;
				}
			}
		});
	},
	//승인취소
	approveCancel:function(){
		var me			= this,
		finder		= me.pocket.finder(),
		pjod_idcd	= finder.down('[name=pjod_idcd]').getValue()
		line_clos	= finder.down('[name=line_clos]')
		;
		Ext.Msg.show({ title: '확인', msg: '승인취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/design/dsigplan1/set/setApprove.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								pjod_idcd		: pjod_idcd,
								updt_idcd		: _global.login_id,
								line_clos		: '0'
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
								line_clos.setValue('0');
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}else{
					return;
				}
			}
		});
	},
	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction1 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	}
});