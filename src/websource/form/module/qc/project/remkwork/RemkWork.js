Ext.define('module.qc.project.remkwork.RemkWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.qc.project.remkwork.model.RemkWorkMaster1',
		'module.qc.project.remkwork.model.RemkWorkMaster2',
		'module.qc.project.remkwork.model.RemkWorkDetail'
	],
	stores	: [
		'module.qc.project.remkwork.store.RemkWorkMaster1',
		'module.qc.project.remkwork.store.RemkWorkMaster2',
		'module.qc.project.remkwork.store.RemkWorkDetail'
	],
	views	: [
		'module.qc.project.remkwork.view.RemkWorkLayout',
		'module.qc.project.remkwork.view.RemkWorkSearch',
		'module.qc.project.remkwork.view.RemkWorkListerMaster1',
		'module.qc.project.remkwork.view.RemkWorkListerMaster2',
		'module.qc.project.remkwork.view.RemkWorkListerDetail',
		'module.qc.project.remkwork.view.RemkWorkEditor',
		'module.qc.project.remkwork.view.RemkWorkPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-remkwork-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// layout event
			'module-remkwork-lister-master1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-remkwork-lister-master2 button[action=exportAction]'	: { click : me.exportAction1},	// 엑셀
			// lister detail event
			'module-remkwork-lister-detail button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-remkwork-lister-detail button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-remkwork-lister-detail button[action=exportAction]'		: { click : me.exportAction2},	// 엑셀
			'module-remkwork-lister-detail button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			// editer event
			'module-remkwork-editor button[action=updateAction]'			: { click : me.updateAction },	// 저장
			'module-remkwork-editor button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			// lister master1 event
			'module-remkwork-lister-master1' : {
				itemdblclick    : me.selectMaster ,
				selectionchange : me.attachRecord1
			},
			// lister master2 event
			'module-remkwork-lister-master2' : {
				itemdblclick    : me.selectDetail ,
				selectionchange : me.attachRecord2
			},
			'module-remkwork-lister-detail' : {
				selectionchange : me.attachRecord3
			},
			'module-remkwork-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-remkwork-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-remkwork-search')[0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-remkwork-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-remkwork-lister-master2')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-remkwork-lister-detail')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-remkwork-editor')[0] },
		popup			: function () { return Ext.ComponentQuery.query('module-remkwork-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster1(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, {	pjod_idcd : record.get('pjod_idcd'),
					line_seqn : record.get('line_seqn')
				});
		}
	},

	selectMaster : function(grid, record) {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			listermaster2 = me.pocket.listermaster2()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listermaster2.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd')});
		}
	},

	attachRecord1:function( smodel, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		listermaster.getStore().clearData();
		listermaster.getStore().loadData([],false);
	},

	attachRecord2:function( smodel, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	attachRecord3:function( smodel, record ){
		var me      = this,
			editor  = me.pocket.editor(),
			lister  = smodel ? smodel.view.ownerCt : me.pocket.listerdetail(),
			mrecord = lister.getSelectionModel().getSelection()
		;

		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : mrecord ? mrecord : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},


	//신규
	insertAction:function() {
		var me = this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster2(),
			listerdetail	= me.pocket.listerdetail(),
			select			= me.pocket.listermaster2().getSelectionModel().getSelection()[0],
			sub				= listerdetail.down('#sub').grid.store.data.length,
			old_poor_seqn	= 0
		;
		if(select){
			editor.getForm().reset();

			Ext.Ajax.request({
				url		: _global.location.http() + '/qc/project/remkwork/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							pjod_idcd : select.get('pjod_idcd'),
							line_seqn : select.get('line_seqn')
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
						old_poor_seqn = result.records[0].poor_seqn;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			old_poor_seqn = old_poor_seqn+1;

			editor.insertRecord({
				caller	: me,
				record	: Ext.create( listerdetail.getStore().model.modelName,{
					pjod_idcd : select.get('pjod_idcd'),
					line_seqn : select.get('line_seqn'),
					prod_qntt : select.get('prod_qntt'),
					poor_seqn : old_poor_seqn
				}),
				listerdetail	: listerdetail,
				disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
				callback: function (results) {
					if (results.success) {
						results.feedback({success : true , visible : true });
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","추가 할 시험 생산 내역을 선택하여 주십시오.");
		}
	},

	//수정
	modifyAction:function() {
		var me     = this,
			editor = me.pocket.editor(),
			select = me.pocket.listerdetail().getSelectionModel().getSelection()[0],
			select1 = me.pocket.listermaster2().getSelectionModel().getSelection()[0],
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster2()
		;
		if(select){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
					}
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			});
		}else{
			Ext.Msg.alert("알림","수정 할 검사 내역을 선택하여 주십시오.");
		}
	},

	//삭제
	deleteAction : function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listerdetail	= me.pocket.listerdetail()
		;
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

	//저장
	updateAction:function() {
		var me				= this,
			listerdetail	= me.pocket.listerdetail(),
			editor			= me.pocket.editor(),
			store			= listerdetail.getStore(),
			select			= me.pocket.listermaster2().getSelectionModel().getSelection()[0]
		;
		if(editor.down('[name=drtr_idcd]').getValue()==null || editor.down('[name=drtr_idcd]').getValue() == ''){
			Ext.Msg.alert("알림","담당자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=poor_cont]').getValue()=='' && editor.down('[name=trtm_cont]').getValue() == ''){
			Ext.Msg.alert("알림","불량내용 또는 조치내용을 반드시 입력해주십시오.");
		}else{
			editor.updateRecord({
				store  : store,
				action : Const.EDITOR.DEFAULT,
				before : function(results, record) {
					if (results.success) {
						if (record.phantom && Ext.isEmpty(record.get('pjod_idcd'))) {
							resource.keygen({
								url		: _global. location.http () + '/listener/seq/maxid.do',
								object	: resource. keygen,
								params	: {
									token : _global. token_id ,
									param : JSON. stringify({
										stor_id		: _global.stor_id,
										table_nm	: 'pjod_test_insp'
									})
								 },
								async	: false,
								callback: function( keygen ) {
									if (keygen.success) {
										record.dirtyValue('pjod_idcd' , keygen.records[0].seq );
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
					me.pocket.search().setDisabled(false);
					listerdetail.select({
						callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
					},{ pjod_idcd : select.get('pjod_idcd'),
						line_seqn : select.get('line_seqn')
					});
					if (results.success){
						editor.collapse(false);
							switch (operation) {
								case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
							}
					}
				}
			});
			var	uploadForm = editor.down('[name=uploadForm]'),
				pjod_idcd  = editor.down('[name=pjod_idcd]').getValue(),
				line_seqn  = editor.down('[name=line_seqn]').getValue(),
				poor_seqn  = editor.down('[name=poor_seqn]').getValue(),
				item_imge  = editor.down('[name=image]').src,
				item_imge2 = editor.down('[name=image2]').src,
				chek1	   = editor.down('[name=imge_chek1]').getValue(),
				chek2	   = editor.down('[name=imge_chek2]').getValue(),
				param={},
				chk1=0, chk2=0
			;
				if(item_imge){
					if(chek1 == "" || chek1 == undefined){
						chk1 = 3;
					}
					else{
						chk1 = 1;
					}
				}
				if(item_imge2){
					if(chek2 == "" || chek2 == undefined){
						chk2=3;
					}else{
						chk2=1;
					}
				}
				param.stor_grp  = _global.stor_grp;
				param.stor_id = _global.stor_id;
				param.pjod_idcd = pjod_idcd;
				param.line_seqn = line_seqn;
				param.poor_seqn = poor_seqn;
				param.chk1		= chk1;
				param.chk2		= chk2;
				Ext.merge(param, this.params);
				uploadForm.getForm().setValues({
				param : JSON.stringify(param)
			});
			// submit
			uploadForm.getForm().submit({
				waitMsg:this.waitMsg, // progressbar 띄우기
				success:function(form, action){
					listerdetail.getStore().reload();
				},
				failure: function(form, action) {
					Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
				}
			});
		}
	},

	//취소
	cancelAction:function() {
		var me           = this,
			editor       = me.pocket.editor(),
			listermaster = me.pocket.listermaster2(),
			listerdetail = me.pocket.listerdetail()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectDetail : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			listerdetail : listerdetail ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},

	exportAction2 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});