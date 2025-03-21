Ext.define('module.notice.noticework.NoticeWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
	],
	models	: [
		'module.notice.noticework.model.NoticeWorkMast',
		'module.notice.noticework.model.NoticeWorkInvoice',
		'module.notice.noticework.model.NoticeWorkItem1',
		'module.notice.noticework.model.NoticeWorkItem2',
	],
	stores	: [
		'module.notice.noticework.store.NoticeWorkMast',
		'module.notice.noticework.store.NoticeWorkInvoice',
		'module.notice.noticework.store.NoticeWorkItem1',
		'module.notice.noticework.store.NoticeWorkItem2',
	],
	views	: [
		'module.notice.noticework.view.NoticeWorkLayout',
		'module.notice.noticework.view.NoticeWorkEditor',
		'module.notice.noticework.view.NoticeWorkSearch',
		'module.notice.noticework.view.NoticeWorkPopup',
		'module.notice.noticework.view.NoticeWorkListerInvoice',
		'module.notice.noticework.view.NoticeWorkListerInvoice2',
		'module.notice.noticework.view.NoticeWorkListerMaster',
		'module.notice.noticework.view.NoticeWorkListerItem',
		'module.notice.noticework.view.NoticeWorkListerItem1',
		'module.notice.noticework.view.NoticeWorkListerItem2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-noticework-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			'module-noticework-layout button[action=enrollment]'		: { click : me.enrollment   },	//등록(<)
			'module-noticework-layout button[action=remove]'			: { click : me.remove       },	//삭제(>)
			// editer event
			'module-noticework-editor button[action=updateAction]'		: { click : me.updateAction },	// 저장
			'module-noticework-editor button[action=cancelAction]'		: { click : me.cancelAction },	// 취소
			// lister master event
			'module-noticework-lister-master button[action=inspAction]'	: { click : me.inspAction   },	// 신규
			'module-noticework-lister-master button[action=inspAction2]': { click : me.inspAction2  },	// 수정
			'module-noticework-lister-master button[action=exportAction]': { click : me.exportAction},	// 엑셀
			'module-noticework-lister-master button[action=deleteAction]': { click : me.deleteAction},	// 삭제
			'module-noticework-lister-master' : {
				selectionchange: me.selectLister
			},
			'module-noticework-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
				'module-noticework-search combobox[name=site_id]' : { select: me.selectLookup  }



		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-noticework-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-noticework-search')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-noticework-editor')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-noticework-lister-master')[0] },
		listeritem		: function () { return Ext.ComponentQuery.query('module-noticework-lister-item')[0] },
		listeritem1		: function () { return Ext.ComponentQuery.query('module-noticework-lister-item1')[0] },
		listeritem2		: function () { return Ext.ComponentQuery.query('module-noticework-lister-item2')[0] },
		listerinvoice	: function () { return Ext.ComponentQuery.query('module-noticework-lister-invoice')[0] },
		listerinvoice2	: function () { return Ext.ComponentQuery.query('module-noticework-lister-invoice2')[0] },
		popup			: function () { return Ext.ComponentQuery.query('module-noticework-popup')[0] }
	},

	//추가팝업
	inspAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			popup  = me.pocket.popup(),
			invc_numb
		;
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method		: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'ntce_mast'
				})
			},
			async: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				invc_numb = result.records[0].seq;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		resource.loadPopup({
			widget : 'module-noticework-popup',
			params : {	invc_numb : invc_numb,
				pswd			: '',
				ansr_yorn		: '1',
				emgc_yorn		: '0',
				scrt_yorn		: '0',
				ntce_cont		: '',
				ntce_eddt		: '',
				ntce_stdt		: '',
				dwup_empy_name	: '',
				sbsd_ttle		: '',
				ntce_ttle		: '',
				ntce_dvcd		: '일반',
				user_memo		: '',
				_set			:'insert'
			}
		});
	},

	//수정팝업
	inspAction2:function() {
		var me = this,
			listermaster = me.pocket.listermaster()
			popup        = me.pocket.popup(),
			mrecords     = listermaster.getSelectionModel().getSelection()
		;
		var err_msg		= "";

		var me = this
		resource.loadPopup({
			widget : 'module-noticework-popup',
			params : {
				pswd           :mrecords[0].data.pswd,
				invc_numb      :mrecords[0].data.invc_numb,
				ntce_dvcd      :mrecords[0].data.ntce_name,
				ansr_yorn      :mrecords[0].data.ansr_yorn,
				emgc_yorn      :mrecords[0].data.emgc_yorn,
				scrt_yorn      :mrecords[0].data.scrt_yorn,
				ntce_cont      :mrecords[0].data.ntce_cont,
				ntce_eddt      :mrecords[0].data.ntce_eddt,
				ntce_stdt      :mrecords[0].data.ntce_stdt,
				sbsd_ttle      :mrecords[0].data.sbsd_ttle,
				ntce_ttle      :mrecords[0].data.ntce_ttle,
				dwup_date      :mrecords[0].data.dwup_date,
				user_memo      :mrecords[0].data.user_memo,
				dwup_empy_name :mrecords[0].data.dwup_empy_name,
				_set           :'update'
			}
		});
	},
	//콤보박스 조회
	selectLookup:function() {
		this.pocket.listermaster().eraser();
	},


	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listeritem1 = me.pocket.listeritem1(),
			listeritem2 = me.pocket.listeritem2(),
			listerinvoice = me.pocket.listerinvoice(),
			listerinvoice2 = me.pocket.listerinvoice2(),
			search 	= me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if (tindex == 0) {
			listermaster = me.pocket.listermaster();
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		} else{
			mask.hide();
			Ext.Msg.alert("알림", "공지사항목록에서 검색하여주십시오.");
		}
	},

	//선택
	selectLister : function(grid, record) {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ listermaster : me.pocket.listermaster(), record : record }, me);
	},

	//삭제
	deleteAction:function() {
		var me				= this,
			listermaster	= me.pocket.listermaster(),
			mrecords		= listermaster.getSelectionModel().getSelection()[0],
			store			= listermaster.getStore()
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/notice/noticework/set/insp.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: mrecords.get('invc_numb'),
					_set			: 'delete'
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
	},

	//대상자 및 열람자
	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me				= this,
			master			= me.pocket.listermaster();
			tindex			= tabPanel.items.indexOf(newCard),
			listeritem		= me.pocket.listeritem(),
			listeritem1		= me.pocket.listeritem1(),
			listeritem2		= me.pocket.listeritem2(),
			listerinvoice	= me.pocket.listerinvoice(),
			listerinvoice2	= me.pocket.listerinvoice2(),
			records			= master.getSelectionModel().getSelection()
		;

		if (tindex == 1) { //대상자
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수정 또는 조회할 공지사항목록을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]
			listeritem.down('[name = ntce_ttle]').setValue(record.get('ntce_ttle'));

			listeritem1.select({
				callback:function(records, operation, success) {
					if (success) {
						listeritem1.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {invc_numb : record.get('invc_numb')},{stor_id : _global.stor_id}, {}) );

			listeritem2.select({
				callback : function(records, operation, success) {
					if (success) {
						listeritem2.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id}, {invc_numb : record.get('invc_numb')}) );
		}

		if (tindex == 2) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "조회할 공지사항목록을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var record = records[0]/*조달구분*/
			listerinvoice2.down('[name = ntce_ttle]').setValue(record.get('ntce_ttle'));

			listerinvoice.select({
				callback : function(records, operation, success) {
					if (success) {
						listerinvoice.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id}, {invc_numb : record.get('invc_numb')}) );
		}
	},

	// < enrollment
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			seqn		= Number(0),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			master		= me.pocket.listermaster(),
			mrecords	= master.getSelectionModel().getSelection(),
			mrecord		= mrecords[0]
			selects		= listeritem2.getSelectionModel().getSelection();
		;
		if (!selects || selects.length<0) {
			Ext.Msg.alert("알림", "추가할 작업자를 선택하여 주십시오.");
			return;
		};
		if(store.data.items.length >0){
			seqn = Number(store.data.items[store.data.items.length-1].data.line_seqn)+1;
		}else{
			seqn = 0;
		}
		var seqnArray = new Array();
		for (var int = 0; int < selects.length; int++) {
			seqnArray[int] = seqn++;
		}
		var i = 0;
		for( i = 0; i<selects.length; i++){
			record[i]= Ext.create( store.model.modelName , {
				_set			: 'insert',
				invc_numb		: mrecord.get('invc_numb'),
				line_seqn		: seqnArray[i],
				empy_idcd		: selects[i].get('user_idcd'),
				empy_name		: selects[i].get('user_name'),
				insp_yorn		: selects[i].get('insp_yorn'),
				insp_dttm		: selects[i].get('insp_dttm'),
				dept_name		: selects[i].get('dept_name'),
				wkrn_name		: selects[i].get('wkrn_name'),
				line_stat		:'0'
			});
		}
		store.add(record);
		store.sync({
			callback: function(batch, options) {
			} ,
			scope: me
		},{	synchro : _global.objects.synchro} );
		store2.reload();
	},

	// > remove
	remove : function() {
		var me = this,
			listeritem	= me.pocket.listeritem(),
			store		= listeritem1.getStore(),
			store2		= listeritem2.getStore(),
			selects		= listeritem1.getSelectionModel().getSelection()
		;
		store.remove (selects);
		store.sync({
			callback : function() {
				store2.reload();
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	}
});