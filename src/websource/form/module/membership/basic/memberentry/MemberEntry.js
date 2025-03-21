Ext.define('module.membership.basic.memberentry.MemberEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MemberPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
		'module.membership.basic.memberentry.model.MemberEntry',
		'module.membership.basic.memberentry.model.MemberEntryMemo',
		'module.membership.basic.memberentry.model.MemberEntryCrct',
		'module.membership.basic.memberentry.model.MemberEntryInot',
		'module.membership.basic.memberentry.model.MemberEntryMngt',
		'module.membership.basic.memberentry.model.MemberEntryFile'
	],
	stores:
	[
		'module.membership.basic.memberentry.store.MemberEntry',
		'module.membership.basic.memberentry.store.MemberEntryMemo',
		'module.membership.basic.memberentry.store.MemberEntryCrct',
		'module.membership.basic.memberentry.store.MemberEntryInot',
		'module.membership.basic.memberentry.store.MemberEntryMngt',
		'module.membership.basic.memberentry.store.MemberEntryFile'
	],
	views:
	[
		'module.membership.basic.memberentry.view.MemberEntryLayout',
		'module.membership.basic.memberentry.view.MemberEntrySearch',
		'module.membership.basic.memberentry.view.MemberEntryLister',
		'module.membership.basic.memberentry.view.MemberEntryEditor',
		'module.membership.basic.memberentry.view.MemberEntryEditorLister',
		'module.membership.basic.memberentry.view.MemberEntryMemoLister',
		'module.membership.basic.memberentry.view.MemberEntryCrctLister',
		'module.membership.basic.memberentry.view.MemberEntryInotLister',
		'module.membership.basic.memberentry.view.MemberEntryMngtLister',
		'module.membership.basic.memberentry.view.MemberEntryMemoPopup',
		'module.membership.basic.memberentry.view.MemberEntryCrctPopup',
		'module.membership.basic.memberentry.view.MemberEntryInotPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-memberentry-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-memberentry-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-memberentry-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-memberentry-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-memberentry-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-memberentry-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-memberentry-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-memberentry-memolister button[action=memoAction]'	: { click : me.memoAction },	// 메모등록
			'module-memberentry-crct-lister button[action=crctAction]'	: { click : me.crctAction },	// 수납등록
			'module-memberentry-inot-lister button[action=inotAction]'	: { click : me.inotAction },	// 출입 등록
			'module-memberentry-inot-lister button[action=inotModifyAction]'	: { click : me.inotModifyAction },	// 출입 등록
			// lister event
			'module-memberentry-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-memberentry-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-memberentry-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-memberentry-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-memberentry-editor')[0] },
		filelister : function () { return Ext.ComponentQuery.query('module-memberentry-editorlister')[0] },
		memolister : function () { return Ext.ComponentQuery.query('module-memberentry-memolister')[0] },
		crctlister : function () { return Ext.ComponentQuery.query('module-memberentry-crct-lister')[0] },
		inotlister : function () { return Ext.ComponentQuery.query('module-memberentry-inot-lister')[0] },
		mngtlister : function () { return Ext.ComponentQuery.query('module-memberentry-mngtlister')[0] },
		memo : function () { return Ext.ComponentQuery.query('module-memberentry-memo-popup')[0] },
		crct : function () { return Ext.ComponentQuery.query('module-memberentry-crct-popup')[0] },
		inot : function () { return Ext.ComponentQuery.query('module-memberentry-inot-popup')[0] },
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
			filelister = me.pocket.filelister(),
			memolister = me.pocket.memolister(),
			mngtlister = me.pocket.mngtlister(),
			crctlister = me.pocket.crctlister(),
			inotlister = me.pocket.inotlister(),
			param  = me.pocket.search().getValues();
		;
//		if(record.length > 0 && record[0].get('item_idcd').length > 0){
//			console.log(record[0].get('item_idcd').length > 0);
//			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
//			filelister.select({
//				callback:function(records, operation, success) {
//					if (success) {
//						Ext.Ajax.request({
//							url		: _global.location.http() + '/item/itemmast/get/image.do',
//							params	: {
//								token : _global.token_id,
//								param : JSON.stringify({
//									stor_id			: _global.stor_id,
//									hqof_idcd		: _global.hqof_idcd,
//									item_idcd		: record[0].get('item_idcd'),
//								})
//							},
//							async	: false,
//							method	: 'POST',
//							success	: function(response, request) {
//								var result = Ext.decode(response.responseText);
//								if	(!result.success ){
//									Ext.Msg.error(result.message );
//								} else {
//									var item_imge = result.records[0].item_imge;
//									var item_imge2 = result.records[0].item_imge2;
//									if(item_imge != undefined){
//										var x = item_imge.toString();
//										var img = new Uint8Array(x.split(",")),
//										blob = new Blob([img],{type:'image/png'}),
//										url = URL.createObjectURL(blob);
//										editor.down('[title=이미지]').down('[name=image]').setSrc(url);
//									}
//									if(item_imge2 != undefined){
//										var x = item_imge2.toString();
//										var img = new Uint8Array(x.split(",")),
//										blob = new Blob([img],{type:'image/png'}),
//										url = URL.createObjectURL(blob);
//										editor.down('[title=이미지]').down('[name=image2]').setSrc(url);
//									}
//								}
//							},
//							failure : function(result, request) {
//							},
//							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//							}
//						});
//					} else { me.pocket.editor().getForm().reset(true);}
//					}, scope:me
//			}, { invc_numb : record[0].get('item_idcd'),orgn_dvcd : 'item_mast',line_seqn: '0' });
//			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('item_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
//		}
//
		if(record.length > 0){
			editor.selectRecord({ memolister : me.pocket.memolister(), record : record }, me);
			if(record[0].get('mmbr_idcd')){
				memolister.select({
					callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , mmbr_idcd : record[0].get('mmbr_idcd')}) );
				crctlister.select({
					callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , mmbr_idcd : record[0].get('mmbr_idcd')}) );
				inotlister.select({
					callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , mmbr_idcd : record[0].get('mmbr_idcd')}) );

				mngtlister.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id , mmbr_idcd : record[0].get('mmbr_idcd')}) );
			}else{
				memolister.getStore().clearData();
				memolister.getStore().loadData([],false);
				mngtlister.getStore().clearData();
				mngtlister.getStore().loadData([],false);
			}
//			editor.selectRecord({ mngtlister : me.pocket.mngtlister(), record : record }, me);
		}
	},


	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			mngtlister = me.pocket.mngtlister(),
			param  = me.pocket.search().getValues();
		;
		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
		}else{
			mngtlister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , mmbr_idcd : editor.getRecord().data.mmbr_idcd}) );
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true });
//						me.pocket.layout().down('#mainpanel').setDisabled(true);
//						me.pocket.search().setDisabled(true);
						me.pocket.layout().down('#master').setDisabled(true);
						me.pocket.layout().down('#detail').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search		= me.pocket.search(),
			lister		= me.pocket.lister(),
			editor		= me.pocket.editor(),
			param		= search.getValues(),
			filelister	= me.pocket.filelister(),
			memolister	= me.pocket.memolister(),
			mngtlister	= me.pocket.mngtlister(),
			select		= lister.getSelectionModel().getSelection()[0],
			mmbr_idcd	= '',
			mmbr_code	= editor.down('[name=mmbr_code]')
		;


		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		memolister.getStore().clearData();
		memolister.getStore().loadData([],false);

		filelister.getStore().clearData();
		filelister.getStore().loadData([],false);


		filelister.down('[name=file]').popup.params.invc_numb = "";

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'mmbr_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					Ext.merge( param, {stor_id : _global.stor_id });
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							mmbr_idcd : keygen.records[0].seq
						}),
						lister		: lister,
						disables	: [me.pocket.layout().down('#master'),me.pocket.layout().down('#detail'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success) {

							Ext.Ajax.request({
								url		: _global.location.http() + '/membership/memberentry/get/mmbrCode.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id		: _global.stor_id,
										hqof_idcd	: _global.hqof_idcd
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
											mmbr_code.setValue(result.records[0].mmbr_code);
										}
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});

								mngtlister.select({
									callback:function(records, operation, success) {
									if (success) {
									} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( param, {stor_id : _global.stor_id ,mmbr_idcd : keygen.records[0].seq}) );
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
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
			chk = 0
		;
		if(param.mmbr_code==''|| param.mmbr_code==null){
			Ext.Msg.alert("알림","회원코드를 입력하여 주십시오.");
			return;
		}
		if(param.mmbr_name==''|| param.mmbr_name==null){
			Ext.Msg.alert("알림","회원명을 입력하여 주십시오.");
			return;
		}
		if(select){
			mmbr_idcd = select.get('mmbr_idcd');
			mmbr_code = select.get('mmbr_code');
		}
		if(mmbr_idcd==param.mmbr_idcd && mmbr_code== param.mmbr_code){
		}else{
			if(param.mmbr_code){
				Ext.Ajax.request({
					url			: _global.api_host_info + "/system/membership/memberentry/get/mmbrCodeCheck.do",
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							mmbr_code	: param.mmbr_code
						})
					},
					async : false,
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						console.log(result);
						chk = result.records[0].chk;
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
					}
				});
			}
		}
		if(chk > 0){
			Ext.Msg.alert('알림','중복된 회원코드입니다. 다시입력해주세요.');
			return;
		}
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mmbr_code'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'mmbr_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('mmbr_idcd' , keygen.records[0].seq );
//									record.set('hqof_idcd' , _global.hqof_idcd );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else {
						results.feedback({success : true });
					}
				}
			},

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
//					me.pocket.layout().down('#mainpanel').setDisabled(false);
//					me.pocket.search().setDisabled(false);
					me.pocket.layout().down('#master').setDisabled(false);
					me.pocket.layout().down('#detail').setDisabled(false);
					me.pocket.search().setDisabled(false);

					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});
		var	uploadForm = editor.down('[name=uploadForm]'),
			select     = lister.getSelectionModel().getSelection()[0],
			mmbr_idcd  = '',
			mmbr_imge  = editor.down('[name=image]').src,
			chek1	   = editor.down('[name=imge_chek1]').getValue(),
			param={},
			chk1=0
		;
			mmbr_idcd  = editor.down('[name=mmbr_idcd]').getValue();

		if(mmbr_imge){
			if(chek1 == "" || chek1 == undefined){
				chk1 = 3;
			}
			else{
				chk1 = 1;
			}
		}
		if(chk>0){
			param.stor_grp  = _global.stor_grp;
			param.stor_id = _global.stor_id;
			param.mmbr_idcd = mmbr_idcd;
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
						store.reload();
				},
				failure: function(form, action) {
					Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
				}
			});
		}

		var memolister = me.pocket.memolister()
			;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = memolister.getStore();
			memolister.getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback : function(results, record ) {
					if (results.success) {

					}
				},
				finished : function(results, record, operation){
					if (results.success){
					}
				}
			});
		var	mngtlister = me.pocket.mngtlister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask }),
			store = mngtlister.getStore();
		;
		mask.show();
		if(store.getUpdatedRecords().length>0){
			store.getUpdatedRecords()[0].data.mmbr_idcd = editor.down('[name=mmbr_idcd]').getValue();
		}
		mngtlister.getStore().sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
			},
			finished : function(results, record, operation){
				if (results.success){
//					me.pocket.layout().down('#mainpanel').setDisabled(false);
//					me.pocket.search().setDisabled(false);
					me.pocket.layout().down('#master').setDisabled(false);
					me.pocket.layout().down('#detail').setDisabled(false);
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

		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
//				me.pocket.layout().down('#mainpanel').setDisabled(false);
//				me.pocket.search().setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
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
		editor.down('[title=회원사진]').down('[name=image]').setSrc('')
		memo.getStore().clearData();
		memo.getStore().loadData([],false);

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
	//메모 추가팝업
	memoAction:function() {
		var me = this,
			listermaster = me.pocket.lister(),
			popup  = me.pocket.memo(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			invc_numb
		;
	;
		if(!select){
			Ext.Msg.alert("알림","메모를 추가할 회원을 선택하여주십시오.");
		}
		else {
			resource.loadPopup({
				widget : 'module-memberentry-memo-popup',
				params : {	invc_numb : invc_numb,
					pswd		: '',
					mmbr_idcd	: select.get('mmbr_idcd'),
					mmbr_code	: select.get('mmbr_code'),
					mmbr_name	: select.get('mmbr_name'),
					drtr_idcd	: select.get('drtr_idcd'),
					drtr_name	: select.get('drtr_name'),
					mmbr_stat_dvcd	: select.get('mmbr_stat_dvcd'),
					dwup_empy_idcd	: _global.login_id,
					dwup_empy_name	: _global.login_nm,
					dwup_date		: '',
					dwup_time		: '',
					memo_dvcd		: '',
					memo_1fst		: '',
					user_memo		: '',
					_set			:'insert'
				}
			});
		}
	},
	//수납 추가팝업
	crctAction:function() {
		var me = this,
			listermaster = me.pocket.lister(),
			popup  = me.pocket.crct(),
			select = listermaster.getSelectionModel().getSelection()[0],
			invc_numb
		;
		if(!select){
			Ext.Msg.alert("알림","수납할 회원을 선택하여주십시오.");
		}
		else {
			resource.loadPopup({
				widget : 'module-memberentry-crct-popup',
				params : {
					invc_numb		: invc_numb,
					mmbr_idcd		: select.get('mmbr_idcd'),
					mmbr_code		: select.get('mmbr_code'),
					mmbr_name		: select.get('mmbr_name'),
					mmbr_stat_dvcd	: select.get('mmbr_stat_dvcd'),
					amtm_yorn		: select.get('amtm_yorn'),
					pmtm_yorn		: select.get('pmtm_yorn'),
					amtm_sttm		: select.get('amtm_sttm'),
					pmtm_sttm		: select.get('pmtm_sttm'),
					mond_time_dvcd	: select.get('mond_time_dvcd'),
					tued_time_dvcd	: select.get('tued_time_dvcd'),
					wedd_time_dvcd	: select.get('wedd_time_dvcd'),
					thud_time_dvcd	: select.get('thud_time_dvcd'),
					frid_time_dvcd	: select.get('frid_time_dvcd'),
					satd_time_dvcd	: select.get('satd_time_dvcd'),
					sund_time_dvcd	: select.get('sund_time_dvcd'),
					line_seqn		: 0,
					drtr_idcd		: _global.login_id,
					drtr_name		: _global.login_nm,
//					acce_date		: Ext.Date.format(new Date(),'Ymd'),
//					lssn_stdt		: Ext.Date.format(new Date(),'Ymd'),
					acce_date		: new Date(),
					lssn_stdt		: new Date(),
					annc_dvcd		: '',
					qntt			: 1,
					pric			: 0,
					amnt			: 0,
					cbil_yorn		: '',
					prtl_colt_yorn	: '0',
					stot_dvcd		: '',
					acct_nmbr		: '',
					user_memo		: '',
					_set			: 'insert'
				}
			});
		}
	},
	//예약 추가팝업
	inotAction:function() {
		var me = this,
			listermaster = me.pocket.lister(),
			lister = me.pocket.inotlister(),
			select = listermaster.getSelectionModel().getSelection()[0],
			selectdetail = lister.getSelectionModel().getSelection()[0],
			invc_numb
		;
		if(!select){
			Ext.Msg.alert("알림","회원을 선택하여주십시오.");
		}
		else {
			resource.loadPopup({
				widget : 'module-memberentry-inot-popup',
				params : {
					invc_numb		: invc_numb,
					mmbr_idcd		: select.get('mmbr_idcd'),
					mmbr_code		: select.get('mmbr_code'),
					mmbr_name		: select.get('mmbr_name'),
					mmbr_stat_dvcd	: select.get('mmbr_stat_dvcd'),
					amtm_yorn		: select.get('amtm_yorn'),
					pmtm_yorn		: select.get('pmtm_yorn'),
					amtm_sttm		: select.get('amtm_sttm'),
					pmtm_sttm		: select.get('pmtm_sttm'),
					mond_time_dvcd	: select.get('mond_time_dvcd'),
					tued_time_dvcd	: select.get('tued_time_dvcd'),
					webd_time_dvcd	: select.get('webd_time_dvcd'),
					thud_time_dvcd	: select.get('thud_time_dvcd'),
					frid_time_dvcd	: select.get('frid_time_dvcd'),
					satd_time_dvcd	: select.get('satd_time_dvcd'),
					sund_time_dvcd	: select.get('sund_time_dvcd'),
					line_seqn		: 0,
//					resv_date		: Ext.Date.format(new Date(),'Ymd'),
					resv_date		: new Date(),
					resv_time		: '00:00',
					need_time		: 0,
					drtr_idcd		: _global.login_id,
					drtr_name		: _global.login_nm,
					acce_date		: '',
					acce_seqn		: 0,
					memo			: '',
					resv_stat_dvcd	: '1',
					proc_drtr_idcd	: '',
					proc_drtr_name	: '',
					proc_date		: '',
					proc_time		: '',
					user_memo		: '',
					_set			: 'insert'
				}
			});
		}
	},

	//예약 수정 팝업
	inotModifyAction:function() {
		var me = this,
			listermaster = me.pocket.lister(),
			lister = me.pocket.inotlister(),
			select = listermaster.getSelectionModel().getSelection()[0],
			selectdetail = lister.getSelectionModel().getSelection()[0],
			invc_numb
		;
		if(!select){
			Ext.Msg.alert("알림","회원을 선택하여주십시오.");
		}else {
			if(!selectdetail){
				Ext.Msg.alert("알림","수정할 예약을 선택하여주십시오.");
			} else {
				resource.loadPopup({
					widget : 'module-memberentry-inot-popup',
					params : {
						invc_numb		: invc_numb,
						mmbr_idcd		: select.get('mmbr_idcd'),
						mmbr_code		: select.get('mmbr_code'),
						mmbr_name		: select.get('mmbr_name'),
						mmbr_stat_dvcd	: select.get('mmbr_stat_dvcd'),
						amtm_yorn		: select.get('amtm_yorn'),
						pmtm_yorn		: select.get('pmtm_yorn'),
						amtm_sttm		: select.get('amtm_sttm'),
						pmtm_sttm		: select.get('pmtm_sttm'),
						mond_time_dvcd	: select.get('mond_time_dvcd'),
						tued_time_dvcd	: select.get('tued_time_dvcd'),
						webd_time_dvcd	: select.get('webd_time_dvcd'),
						thud_time_dvcd	: select.get('thud_time_dvcd'),
						frid_time_dvcd	: select.get('frid_time_dvcd'),
						satd_time_dvcd	: select.get('satd_time_dvcd'),
						sund_time_dvcd	: select.get('sund_time_dvcd'),
						line_seqn		: selectdetail.get('line_seqn'),
						resv_date		: selectdetail.get('resv_date'),
						resv_time		: selectdetail.get('resv_time'),
						need_time		: selectdetail.get('need_time'),
						drtr_idcd		: selectdetail.get('drtr_idcd'),
						drtr_name		: selectdetail.get('drtr_name'),
						acce_date		: selectdetail.get('acce_date'),
						acce_seqn		: selectdetail.get('acce_seqn'),
						memo			: selectdetail.get('memo'),
						resv_stat_dvcd	: selectdetail.get('resv_stat_dvcd'),
						proc_drtr_idcd	: selectdetail.get('proc_drtr_idcd'),
						proc_drtr_name	: selectdetail.get('proc_drtr_name'),
						proc_date		: selectdetail.get('proc_date'),
						proc_time		: selectdetail.get('proc_time'),
						user_memo		: selectdetail.get('user_memo'),
						_set			: 'update'
					}
				});
			}
		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
