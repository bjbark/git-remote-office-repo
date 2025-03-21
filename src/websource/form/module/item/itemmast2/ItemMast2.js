Ext.define('module.item.itemmast2.ItemMast2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.BoltNumbPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
	 	'module.item.itemmast2.model.ItemMast2',
	 	'module.item.itemmast2.model.ItemMast2Memo',
	 	'module.item.itemmast2.model.ItemMast2Mngt',
	 	'module.item.itemmast2.model.ItemMast2Pkge',
	 	'module.item.itemmast2.model.ItemMast2File'
	],
	stores:
	[
	 	'module.item.itemmast2.store.ItemMast2',
	 	'module.item.itemmast2.store.ItemMast2Memo',
	 	'module.item.itemmast2.store.ItemMast2Mngt',
	 	'module.item.itemmast2.store.ItemMast2Pkge',
	 	'module.item.itemmast2.store.ItemMast2File'
	],
	views:
	[
		'module.item.itemmast2.view.ItemMast2Layout',
		'module.item.itemmast2.view.ItemMast2Search',
		'module.item.itemmast2.view.ItemMast2Lister',
		'module.item.itemmast2.view.ItemMast2Editor',
		'module.item.itemmast2.view.ItemMast2EditorLister',
		'module.item.itemmast2.view.ItemMast2MemoLister',
		'module.item.itemmast2.view.ItemMast2MngtLister',
		'module.item.itemmast2.view.ItemMast2PkgeLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-itemmast2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-itemmast2-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-itemmast2-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-itemmast2-lister button[action=copyAction]'   : { click : me.copyAction   }, /* 뉴볼텍 품목복사 */
			'module-itemmast2-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-itemmast2-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-itemmast2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-itemmast2-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-itemmast2-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-itemmast2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-itemmast2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-itemmast2-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-itemmast2-editor')[0] },
		filelister : function () { return Ext.ComponentQuery.query('module-itemmast2-editorlister')[0] },
		memolister : function () { return Ext.ComponentQuery.query('module-itemmast2-memolister')[0] },
		mngtlister : function () { return Ext.ComponentQuery.query('module-itemmast2-mngtlister')[0] },
		pkgelister : function () { return Ext.ComponentQuery.query('module-itemmast2-pkgelister')[0] }
	},


	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.acct_code == ''||param.acct_code == null) {
			Ext.Msg.alert("알림","상세검색의 계정구분을 반드시 입력하여주십시오.");
		}else{
			if(param.acct_code == '3000' || param.acct_code == '4000'){			// 체크해서 tab hide show 처리
				if( _global.hq_id !='N1000hjsys'){
					lister.down('[dataIndex=cont_cstm_name]').show();
					lister.down('[dataIndex=shpm_pric_1fst]').show();
					lister.down('[dataIndex=shpm_pric_2snd]').show();
					lister.down('[dataIndex=shpm_pric_3trd]').show();
					lister.down('[dataIndex=shpm_pric_4frt]').show();
					lister.down('[dataIndex=shpm_pric_5fit]').show();
//				lister.down('[dataIndex=cnsr_pric]').hide();
					lister.down('[dataIndex=puch_pric]').hide();
				}
			}else{
				if( _global.hq_id !='N1000hjsys'){
					lister.down('[dataIndex=cont_cstm_name]').hide();
					lister.down('[dataIndex=shpm_pric_1fst]').hide();
					lister.down('[dataIndex=shpm_pric_2snd]').hide();
					lister.down('[dataIndex=shpm_pric_3trd]').hide();
					lister.down('[dataIndex=shpm_pric_4frt]').hide();
					lister.down('[dataIndex=shpm_pric_5fit]').hide();
	//				lister.down('[dataIndex=cnsr_pric]').hide();
	//				lister.down('[dataIndex=puch_pric]').show();
					lister.down('[dataIndex=puch_pric]').hide();
				}
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			filelister = me.pocket.filelister(),
			memolister = me.pocket.memolister(),
			mngtlister = me.pocket.mngtlister(),
			param  = me.pocket.search().getValues();
		;
		if(record[0]){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/item/itemmast2/get/image.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									item_idcd		: record[0].get('item_idcd'),
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
								} else {
									var item_imge = result.records[0].item_imge;
									var item_imge2 = result.records[0].item_imge2;
									if(item_imge != undefined){
										var x = item_imge.toString();
										var img = new Uint8Array(x.split(",")),
										blob = new Blob([img],{type:'image/png'}),
										url = URL.createObjectURL(blob);
										editor.down('[title=이미지]').down('[name=image]').setSrc(url);
									}
									if(item_imge2 != undefined){
										var x = item_imge2.toString();
										var img = new Uint8Array(x.split(",")),
										blob = new Blob([img],{type:'image/png'}),
										url = URL.createObjectURL(blob);
										editor.down('[title=이미지]').down('[name=image2]').setSrc(url);
									}
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('item_idcd'),orgn_dvcd : 'item_mast',line_seqn: '0' });
			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('item_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
		if(record!=''){
			editor.selectRecord({ memolister : me.pocket.memolister(), record : record }, me);
			memolister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , item_idcd : editor.getRecord().data.item_idcd}) );
			mngtlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , item_idcd : editor.getRecord().data.item_idcd}) );
//			editor.selectRecord({ mngtlister : me.pocket.mngtlister(), record : record }, me);
		}
	},

	copyAction:function() {
		var me = this,
			lister = me.pocket.lister()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		Ext.Msg.confirm("확인", "품목을 복사하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url		: _global.location.http() + '/item/itemmast2/set/copy.do',
					method	: 'POST',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							invc_numb	: records[0].get('item_idcd'),
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd
						})
					},
					success	: function(response, request) {
						var object = response,
						result = Ext.decode(object.responseText)
						;
						Ext.Msg.alert("알림", "복사가 완료 되었습니다.");
						me.pocket.lister().getStore().reload();
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						me.pocket.lister().getStore().loadData([],true);
					}
				});
			}
		})
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
			}, Ext.merge( param, {stor_id : _global.stor_id , item_idcd : editor.getRecord().data.item_idcd}) );
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true });
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search	= me.pocket.search(),
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor(),
			param	= search.getValues(),
			filelister = me.pocket.filelister(),
			memolister = me.pocket.memolister(),
			mngtlister = me.pocket.mngtlister(),
			select	= lister.getSelectionModel().getSelection()[0],
			item_idcd  = '',
			tabs	= editor.down('[title=관리항목]').up('tabpanel'),
//			purc	= editor.down('[name=edit_tab1]'),
//			adon	= editor.down('[name=edit_tab2]'),
//			desc	= editor.down('[name=edit_tab3]'),
//			cont	= editor.down('[name=edit_tab4]'),
			item_code= editor.down('[name=item_code]'),
			acct_code = search.down('[name=acct_code]').getValue()
		;


		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image2]').setSrc('');
		memolister.getStore().clearData();
		memolister.getStore().loadData([],false);

		filelister.getStore().clearData();
		filelister.getStore().loadData([],false);


		filelister.down('[name=file]').popup.params.invc_numb = "";
//		adon.tab.hide();
//		desc.tab.hide();
//		purc.tab.hide();

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'item_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					Ext.merge( param, {stor_id : _global.stor_id });
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							item_idcd : keygen.records[0].seq
						}),
						lister		: lister,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success) {
								switch (acct_code) {
								case '1001' : {  /* 원재료  */
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(purc);
									break;
								};
								case '1002': {  /* 부재료  */
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(purc);
									break;
								};
								case '1003': {  /* 소모품  */
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(purc);
									break;
								};
								case '2001': {	/* 제공품  */
//									purc.tab.show();
									cont.tab.hide();
//									tabs.setActiveTab(purc);
									break;
								};
								case '2002': {	/* 반제품  */
//									purc.tab.hide();
//									cont.tab.show();
//									tabs.setActiveTab(cont);
									break;
								};
								case '3000' : {	/* 제품  */
//									purc.tab.hide();
//									cont.tab.show();
//									tabs.setActiveTab(cont);
									if	(_global.options.item_adon_disp_yorn==1
											&& _global.hq_id == 'N1000dooin') {
//										adon.tab.show();
//										tabs.setActiveTab(adon);
									}
									if	(_global.options.item_spec_disp_yorn==1) {
//										desc.tab.show();
//										tabs.setActiveTab(desc);
									}
									break;
								};
								case '4000': {	/* 상품  */
//									purc.tab.hide();
//									cont.tab.show();
//									tabs.setActiveTab(cont);
									break;
								};
								case '5000': {	/* 집기비품  */
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(cont);
									break;
								};
								case '6000': {	/* 공구기구  */
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(purc);
									break;
								};
								default : {
//									purc.tab.show();
//									cont.tab.hide();
//									tabs.setActiveTab(purc);
								}
							};
							Ext.Ajax.request({
								url		: _global.location.http() + '/item/itemmast2/get/itemCode.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
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
										if(result.records.length>0){
											item_code.setValue(result.records[0].item_code);
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
								}, Ext.merge( param, {stor_id : _global.stor_id ,item_idcd : keygen.records[0].seq}) );
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
			tabs	= editor.down('[title=관리항목]').up('tabpanel'),
//			purc	= editor.down('[name=edit_tab1]'),
//			adon	= editor.down('[name=edit_tab2]'),
//			desc	= editor.down('[name=edit_tab3]'),
//			cont	= editor.down('[name=edit_tab4]'),
			acct_code = search.down('[name=acct_code]').getValue(),
			param	= editor.getValues(),
			select	= lister.getSelectionModel().getSelection()[0],
			item_idcd,item_code,
			chk = 0
		;
		if(param.item_code==''|| param.item_code==null){
			Ext.Msg.alert("알림","품목코드를 입력하여 주십시오.");
			return;
		}
		if(param.item_name==''|| param.item_name==null){
			Ext.Msg.alert("알림","품명을 입력하여 주십시오.");
			return;
		}
		if(param.acct_bacd==''|| param.acct_bacd==null){
			Ext.Msg.alert("알림","계정구분을 선택하여 주십시오.");
			return;
		}
		if(select){
			item_idcd = select.get('item_idcd');
			item_code = select.get('item_code');
		}
		if(item_idcd==param.item_idcd && item_code== param.item_code){
		}else{
			if(param.item_code){
				Ext.Ajax.request({
					url			: _global.api_host_info + "/system/item/itemmast2/get/itemCodeCheck.do",
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							item_code	: param.item_code
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
			Ext.Msg.alert('알림','중복된 품목코드입니다. 다시입력해주세요.');
			return;
		}
//		adon.tab.hide();
//		desc.tab.hide();
		switch (acct_code) {
			case '1001' : {  /* 원재료  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(purc);
				break;
			};
			case '1002': {  /* 부재료  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(purc);
				break;
			};
			case '1003': {  /* 소모품  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(purc);
				break;
			};
			case '2001': {	/* 제공품  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(purc);
				break;
			};
			case '2002': {	/* 반제품  */
//				purc.tab.hide();
//				cont.tab.show();
//				tabs.setActiveTab(cont);
				break;
			};
			case '3000': {	/* 제품  */
//				purc.tab.hide();
//				cont.tab.show();
//				tabs.setActiveTab(cont);
				if	(_global.options.item_adon_disp_yorn==1
						&& _global.hq_id == 'N1000dooin') {
//					adon.tab.show();
//					tabs.setActiveTab(adon);
				}
				if	(_global.options.item_spec_disp_yorn==1) {
//					desc.tab.show();
//					tabs.setActiveTab(desc);
				}
				break;
			};
			case '4000': {	/* 상품  */
//				purc.tab.hide();
//				cont.tab.show();
//				tabs.setActiveTab(cont);
				break;
			};
			case '5000': {	/* 집기비품  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(cont);
				break;
			};
			case '6000': {	/* 공구기구  */
//				purc.tab.show();
//				cont.tab.hide();
//				tabs.setActiveTab(purc);
				break;
			};
			default : {
//				purc.tab.show();
				cont.tab.hide();
//				tabs.setActiveTab(purc);
			}
		};

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('item_code'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'item_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('item_idcd' , keygen.records[0].seq );
									record.set('hqof_idcd' , _global.hqof_idcd );
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
				record.set('hqof_idcd' , _global.hqof_idcd );
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
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
				me.selectAction();
			}
		});
		var	uploadForm = editor.down('[name=uploadForm]'),
			select     = lister.getSelectionModel().getSelection()[0],
			item_idcd  = '',
			item_imge  = editor.down('[name=image]').src,
			item_imge2 = editor.down('[name=image2]').src,
			chek1	   = editor.down('[name=imge_chek1]').getValue(),
			chek2	   = editor.down('[name=imge_chek2]').getValue(),
			param={},
			chk1=0, chk2=0
		;
			item_idcd  = editor.down('[name=item_idcd]').getValue();

		if(item_imge){
			if(chek1 == "" || chek1 == undefined){
				chk1 = 3;
			}
			else{
				chk1 = 1;
			}lister.getStore().reload();
		}
		if(item_imge2){
			if(chek2 == "" || chek2 == undefined){
				chk2=3;
			}else{
				chk2 = 1;
			}lister.getStore().reload();
		}

		param.stor_grp  = _global.stor_grp;
		param.stor_id = _global.stor_id;
		param.item_idcd = item_idcd;
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
//		lister.getStore().reload();


		var	mngtlister = me.pocket.mngtlister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask }),
			store = mngtlister.getStore();
		;
		mask.show();
		if(store.getUpdatedRecords().length>0){
			store.getUpdatedRecords()[0].data.item_idcd = editor.down('[name=item_idcd]').getValue();
		}
		mngtlister.getStore().sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});
//		lister.getStore().reload();
	},

	//취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues();
//			purc = editor.down('[title=자재정보]'),
			tabs = editor.down('[title=관리항목]').up('tabpanel'),
//			adon = editor.down('[title=제품정보]'),
			memo   = me.pocket.memolister(),
			mngtlister = me.pocket.mngtlister()
		;

		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image2]').setSrc('');
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
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
		editor.down('[title=이미지]').down('[name=image]').setSrc('')
		editor.down('[title=이미지]').down('[name=image2]').setSrc('')
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

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
