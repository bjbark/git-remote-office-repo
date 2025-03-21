Ext.define('module.sale.project.prjtwork.PrjtWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.sale.project.prjtwork.model.PrjtWorkMaster',
		'module.sale.project.prjtwork.model.PrjtWorkDetail1',
		'module.sale.project.prjtwork.model.PrjtWorkDetail2',
		'module.sale.project.prjtwork.model.PrjtWorkDetail3',
		'module.sale.project.prjtwork.model.PrjtWorkDetail4',
		'module.sale.project.prjtwork.model.PrjtWorkInvoice',
		'module.sale.project.prjtwork.model.PrjtWorkPay',
		'module.sale.project.prjtwork.model.PrjtWorkFile'
	],
	stores	: [
		'module.sale.project.prjtwork.store.PrjtWorkMaster',
		'module.sale.project.prjtwork.store.PrjtWorkDetail1',
		'module.sale.project.prjtwork.store.PrjtWorkDetail2',
		'module.sale.project.prjtwork.store.PrjtWorkDetail3',
		'module.sale.project.prjtwork.store.PrjtWorkDetail4',
		'module.sale.project.prjtwork.store.PrjtWorkInvoice',
		'module.sale.project.prjtwork.store.PrjtWorkFile'
	],
	views	: [
		'module.sale.project.prjtwork.view.PrjtWorkLayout',
		'module.sale.project.prjtwork.view.PrjtWorkSearch',
		'module.sale.project.prjtwork.view.PrjtWorkListerMaster',
		'module.sale.project.prjtwork.view.PrjtWorkListerDetail1',
		'module.sale.project.prjtwork.view.PrjtWorkListerDetail2',
		'module.sale.project.prjtwork.view.PrjtWorkListerDetail3',
		'module.sale.project.prjtwork.view.PrjtWorkListerDetail4',
		'module.sale.project.prjtwork.view.PrjtWorkPayLister',
		'module.sale.project.prjtwork.view.PrjtWorkPaySearch',
		'module.sale.project.prjtwork.view.PrjtWorkEditor',
		'module.sale.project.prjtwork.view.PrjtWorkEditor2',
		'module.sale.project.prjtwork.view.PrjtWorkConsultingPopup',
		'module.sale.project.prjtwork.view.PrjtWorkResultPopup',
		'module.sale.project.prjtwork.view.PrjtWorkCopyPopup',
		'module.sale.project.prjtwork.view.PrjtWorkAppendFiles'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtwork-layout button[action=selectAction]'				: { click : me.selectAction },		// 조회
			'module-prjtwork-layout #detail'									: { tabchange : me.selectDetail },
			// lister master event
			'module-prjtwork-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-prjtwork-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-prjtwork-lister-master menuitem[action=okAction]'			: { click : me.okAction },			/* 승인 */
			'module-prjtwork-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction },	/* 승인취소 */

			'module-prjtwork-lister-master button[action=modifyAction]'			: { click : me.modifyAction },		// 수정
			'module-prjtwork-lister-master button[action=insertAction]'			: { click : me.insertAction },		// 신규
			'module-prjtwork-lister-master button[action=exportAction]'			: { click : me.exportAction },		// 엑셀
			'module-prjtwork-lister-master button[action=amendAction]'			: { click : me.amendAction },		// amend
			'module-prjtwork-lister-master button[action=copyAction]'			: { click : me.copyAction },		// 주문복사
			'module-prjtwork-lister-master button[action=deleteAction]'			: { click : me.deleteAction },		// 삭제
			// lister detail2 event
			'module-prjtwork-lister-detail1 button[action=modifyAction]'		: { click : me.modifyAction1 },		// 수정
			'module-prjtwork-lister-detail1 button[action=exportAction]'		: { click : me.exportAction1 },		// 엑셀
			'module-prjtwork-lister-detail1 button[action=deleteAction]'		: { click : me.deleteAction1 },		// 삭제
			// lister detail1 event
			'module-prjtwork-lister-detail2 button[action=exportAction]'		: { click : me.exportAction2},		// 엑셀
			// lister detail3 event
			'module-prjtwork-lister-detail3 button[action=exportAction]'		: { click : me.exportAction3},		// 엑셀
			// lister detail4 event
			'module-prjtwork-lister-detail4 button[action=exportAction]'		: { click : me.exportAction4},		// 엑셀
			'module-prjtwork-lister-detail4 button[action=consultingAction]'	: { click : me.consultingAction},	// 상담등록
			'module-prjtwork-lister-detail4 button[action=resultAction]'		: { click : me.resultAction},		// 결과입력
			// editer event
			'module-prjtwork-editor button[action=updateAction]'				: { click : me.updateAction },		// 저장
			'module-prjtwork-editor button[action=cancelAction]'				: { click : me.cancelAction },		// 취소
			// editer2 event
			'module-prjtwork-editor2 button[action=updateAction]'				: { click : me.updateAction1 },	// 저장
			'module-prjtwork-editor2 button[action=cancelAction]'				: { click : me.cancelAction1 },	// 취소
			// lister master event
			'module-prjtwork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectionchange
			},
			'module-prjtwork-lister-detail1' : {
				selectionchange: me.selectRecord
			},
			'module-prjtwork-layout #mainpanel' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-prjtwork-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-prjtwork-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-prjtwork-lister-master')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-prjtwork-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-prjtwork-lister-detail2')[0] },
		listerdetail3	: function () { return Ext.ComponentQuery.query('module-prjtwork-lister-detail3')[0] },
		listerdetail4	: function () { return Ext.ComponentQuery.query('module-prjtwork-lister-detail4')[0] },
		paysearch		: function () { return Ext.ComponentQuery.query('module-prjtwork-paysearch')[0] },
		paylister		: function () { return Ext.ComponentQuery.query('module-prjtwork-paylister')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-prjtwork-editor')[0] },
		editor2			: function () { return Ext.ComponentQuery.query('module-prjtwork-editor2')[0] },
		consultingpopup	: function () { return Ext.ComponentQuery.query('module-prjtwork-consultingpopup')[0] },
		resultpopup		: function () { return Ext.ComponentQuery.query('module-prjtwork-resultpopup')[0] },
		editorlister	: function () { return Ext.ComponentQuery.query('module-prjtwork-editorlister')[0] },
		popup			: function () { return Ext.ComponentQuery.query('module-prjtwork-popup')[0] }
	},

	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			master = me.pocket.listermaster()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('pjod_idcd'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'pjod_mast'
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
								}
							});
						})
					}
				}
			});
		}
	},
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			master = me.pocket.listermaster()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") != "1") {
					err_msg = "마감해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('pjod_idcd'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'pjod_mast'
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
								}
							});
						})
					}
				}
			});
		}
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
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
	selectDetail:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			tpanel = me.pocket.layout().down('#detail'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined,
			listermaster  = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail3(),
			listerdetail4 = me.pocket.listerdetail4(),
			editorlister  = me.pocket.editorlister(),
			paylister     = me.pocket.paylister(),
			record        = listermaster.getSelectionModel().getSelection()[0]
		;
		if(record==null){
		}else{
			if(tindex!=4){
				if(tindex == 0){
					lister = listerdetail1
				}else if(tindex == 1){
					lister = listerdetail2
				}else if(tindex == 2){
					lister = listerdetail3
				}else if(tindex == 3){
					lister = listerdetail4
				}
				lister.select({
					callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
				}, { pjod_idcd : record.get('pjod_idcd') });
			}else{
				editorlister.select({
					 callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
				}, { invc_numb : record.get('pjod_idcd'),orgn_dvcd : 'pjod_mast' });
				editorlister.down('[name=file]').popup.params.invc_numb = record.get('pjod_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			}
		}
		if(record == null){
			return;
		}else{
			var me    = this,
			editor    = me.pocket.editor(),
			paylister = me.pocket.paylister();
			editor.selectRecord({ listermaster : me.pocket.listermaster(), record : record }, me);
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ pjod_idcd : record.get('pjod_idcd') })},
				lister	: paylister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
					}
				},
			}, me);
		}
	},

	selectionchange:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2(),
			listerdetail3 = me.pocket.listerdetail3(),
			listerdetail4 = me.pocket.listerdetail4(),
			editorlister  = me.pocket.editorlister()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);

		listerdetail3.getStore().clearData();
		listerdetail3.getStore().loadData([],false);

		listerdetail4.getStore().clearData();
		listerdetail4.getStore().loadData([],false);

		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);
	},

	selectRecord:function( grid, record ){
		var me = this,
			editor2 = me.pocket.editor2()
		;
		editor2.selectRecord({ listerdetail1 : me.pocket.listerdetail1(), record : record }, me);
	},

	//승인
	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			master = me.pocket.listermaster()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '1'); // 1:승인 / 0:취소
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtwork/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('pjod_idcd'),
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
								}
							});
						})
					}
				}
			});
		}
	},

	//승인취소
	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			master = me.pocket.listermaster()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") != "1") {
					err_msg = "승인 취소할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 취소할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인 취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '0'); // 0:승인취소 / 1:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtwork/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('pjod_idcd'),
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
								}
							});
						})
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search        = me.pocket.search(),
			listermaster  = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
			paylister     = me.pocket.paylister(),
			editor        = me.pocket.editor(),
			param         = search.getValues(),
			mrecord       = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
			sub           = listerdetail1.down('#sub').grid.store.data.length;
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		paylister.getStore().clearData();
		paylister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'pjod_mast',
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						action	: 'invoice',
						record	: Ext.create( 'module.sale.project.prjtwork.model.PrjtWorkInvoice',{
							pjod_idcd : keygen.records[0].seq,
							expt_dvcd : 0,
							drtr_idcd : _global.login_id,
							drtr_name : _global.login_nm
						}),
						lister		: paylister,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback	: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true });
								editor.expand(false);
							}
						}
					});
				}
				me.pocket.layout().down('#master').setDisabled(true);
				me.pocket.layout().down('#detail').setDisabled(true);
			}
		});
	},

	//수정
	modifyAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			mrecord      = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			editor       = me.pocket.editor(),
			paylister    = me.pocket.paylister()
		;
		if(mrecord){
			if(select.get('cofm_yorn') == 1){
				Ext.Msg.alert("알림","승인 된 수주는 수정할 수 없습니다.");
			}else{
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {param:JSON.stringify({ pjod_idcd : mrecord.get('pjod_idcd') })},
					lister	: paylister,
					callback: function( results ) {
						if (results.success){
							results.feedback( {success : true } );
							editor.expand(false);
						}
						me.pocket.layout().down('#master').setDisabled(true);
						me.pocket.layout().down('#detail').setDisabled(true);
						me.pocket.search().setDisabled(true);
					},
				}, me);
			}
		}
	},

	//detail 수정
	modifyAction1 :function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			select = me.pocket.listerdetail1().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor2()
		;
		if(select){
			editor.modifyRecord({
				caller   : me,
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
					}me.pocket.layout().down('#master').setDisabled(true);
					 me.pocket.layout().down('#detail').setDisabled(true);
					 me.pocket.search().setDisabled(true);
				}
			});
		}else{
			Ext.Msg.alert("알림","수정할 데이터를 선택해주십시오.");
		}
	},

	//master update
	updateAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			editor       = me.pocket.editor(),
			store        = editor.getStore(),
			paylister    = me.pocket.paylister(),
			getPay       = paylister.getSelectionModel().view.store.data.items,
			mrecord      =  listermaster.getSelectionModel().getSelection()[0]
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record) {
				record.set('item_idcd', record.get('pjod_idcd'));
				record.set('item_code', record.get('pjod_idcd'));
				record.data.product = getPay;
				if (results.success) {
					var info	= record,
						dirty	= false
				;
				var a = 1;
				info.product().data.each( function( item ) {
					item.set('pjod_idcd', info.get('pjod_idcd'));
					item.set('line_seqn', a++);
					item.set('_set', 'insert');
					if (item.dirty || item.phantom) {
						dirty = true;
					}
				});
				if (dirty) {
					info.setDirty();
				}
				results.feedback({success : true  });
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( listermaster.getStore().model.modelName , record.data );
								listermaster.getStore().insert(0, ms);
							} else {
								ms = listermaster.getStore().findRecord('pjod_idcd', record.get('pjod_idcd'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							paylister.getStore().loadData(record.product().data.items, false);
							listermaster.getSelectionModel().select(ms);
							listermaster.getStore().commitChanges();
							results.feedback({success : true });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
				editor.collapse(false);
//				Ext.ComponentQuery.query('module-prjtwork-paysearch').getForm().reset();
			}
		});
		var	uploadForm = editor.down('[name=uploadForm]'),
			pjod_idcd  = editor.down('[name=pjod_idcd]').getValue(),
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
				listermaster.getStore().reload();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
			}
		});
	},

	updateAction1:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			editor2       = me.pocket.editor2(),
			store         = listerdetail1.getStore(),
			mrecord       =  listerdetail1.getSelectionModel().getSelection()[0]
		;
		editor2.updateRecord({
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
									table_nm	: 'pjod_amnd'
								})
							},
							async  : false,
							callback : function( keygen ) {
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
						callback: function(operation){ results.callback({}); }
					} );
				}
				me.pocket.search().setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				editor2.collapse(false);
			},
			finished : function(results, record, operation){
				if (results.success){

					editor2.collapse(false);
					me.pocket.listermaster().getStore().reload();
				}
			}
		});
	},

	//master삭제
	deleteAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			mrecord      = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			editor       = me.pocket.editor(),
			paylister    = me.pocket.paylister(),
			store        = listermaster.getStore()
		;
		if(select.get('cofm_yorn') == 1){
			Ext.Msg.alert("알림","승인 된 수주는 수정할 수 없습니다.");
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/project/prjtwork/set/deleteMaster.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						pjod_idcd		: select.get('pjod_idcd'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					console.log(result);
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
		}
	},

	//detail 삭제
	deleteAction1 : function() {
		var me = this,
			editor2 = me.pocket.editor2(),
			listerdetail1 = me.pocket.listerdetail1()
		;
		editor2.deleteRecord({
			lister : me.pocket.listerdetail1(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//master 취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			listermaster = me.pocket.listermaster()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectDetail : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.down('[title=이미지]').down('[name=image]').setSrc('')
		editor.down('[title=이미지]').down('[name=image2]').setSrc('')
		editor.attachRecord({
			caller : me ,
			listermaster : listermaster ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//detail 취소
	cancelAction1 : function() {
		var me = this,
			editor2 = me.pocket.editor2(),
			listermaster = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1()
		;
		editor2.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectDetail : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor2.attachRecord({
			caller : me ,
			listerdetail1 : listerdetail1 ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	copyAction:function() {
			var me = this,
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			listermaster = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
			popup  = me.pocket.popup(),
			record = listerdetail1.getStore()
		;

		var err_msg		= "";
		var records		= listermaster.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하려는 목록을 선택 후 진행하십시오");
			return;
		}

		var me = this
		resource.loadPopup({
			widget : 'module-prjtwork-popup',
		});
		console.log(records[0].data.deli_date);
		var numb = Ext.ComponentQuery.query('#pjod_idcd')[0].setValue(records[0].data.pjod_idcd);
		var numb1 = Ext.ComponentQuery.query('#deli_date')[0].setValue(records[0].data.deli_date);
	},

	amendAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
			select = me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		if(select){
			Ext.Msg.confirm("확인", "수주를 AMEND 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/project/prjtwork/set/amend.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								pjod_idcd	: select.get('pjod_idcd')
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							Ext.Msg.alert("알림","수주가 amend되었습니다.");
							listerdetail1.getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.listermaster().getStore().loadData([],true);
							me.pocket.listerdetail1().getStore().loadData([],false);
							me.pocket.listermaster().getStore().reload();
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","amend할 주문을 복사해주십시오.");
		}
	},

	//상담등록
	consultingAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail4 = me.pocket.listerdetail4(),
			consultingpopup  = me.pocket.consultingpopup(),
			sub = listerdetail4.down('#sub').grid.store.data.length;
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "수주내역을 선택해주십시오.");
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/project/prjtwork/get/seqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					pjod_idcd : records[0].data.pjod_idcd
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
					old_line_seqn = result.records[0].line_seqn;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		old_line_seqn = old_line_seqn+1;
		var me = this
		resource.loadPopup({
			widget : 'module-prjtwork-consulting-popup',
		});
		var numb = Ext.ComponentQuery.query('#pjod_idcd')[0].setValue(records[0].data.pjod_idcd);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(old_line_seqn);
		var numb3 = Ext.ComponentQuery.query('#drtr_idcd')[0].setValue(_global.login_id);
		var numb4 = Ext.ComponentQuery.query('#drtr_name')[0].setValue(_global.login_nm);
		var numb5 = Ext.ComponentQuery.query('#cnsl_dttm1')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb6 = Ext.ComponentQuery.query('#cnsl_dttm2')[0].setValue(Ext.Date.format(new Date(), 'h:i'));
	},

	//결과입력
	resultAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail4 = me.pocket.listerdetail4(),
			resultpopup  = me.pocket.resultpopup(),
			sub = listerdetail4.down('#sub').grid.store.data.length;
		;
		var err_msg = "";
		var records = listerdetail4.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "상담내역을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-prjtwork-result-popup',
		});
		var numb = Ext.ComponentQuery.query('#pjod_idcd')[0].setValue(records[0].data.pjod_idcd);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.line_seqn);
		var numb3 = Ext.ComponentQuery.query('#rply_drtr_idcd')[0].setValue(_global.login_id);
		var numb4 = Ext.ComponentQuery.query('#rply_drtr_name')[0].setValue(_global.login_nm);
		var numb5 = Ext.ComponentQuery.query('#rply_dttm1')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb6 = Ext.ComponentQuery.query('#rply_dttm2')[0].setValue(Ext.Date.format(new Date(), 'h:i'));
	},


	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

	exportAction2 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},

	exportAction3 : function() {
		this.pocket.listerdetail3().writer({enableLoadMask:true});
	},

	exportAction4 : function() {
		this.pocket.listerdetail4().writer({enableLoadMask:true});
	}
});