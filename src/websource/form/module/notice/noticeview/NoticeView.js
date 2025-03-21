Ext.define('module.notice.noticeview.NoticeView', { extend:'Axt.app.Controller',

	models	: [
		'module.notice.noticeview.model.NoticeViewMast',
	],
	stores	: [
		'module.notice.noticeview.store.NoticeViewMast',
	],
	views	: [
		'module.notice.noticeview.view.NoticeViewLayout',

		'module.notice.noticeview.view.NoticeViewSearch',
		'module.notice.noticeview.view.NoticeViewPopup',
		'module.notice.noticeview.view.NoticeViewListerMaster',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-noticeview-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// lister master event
			'module-noticeview-lister-master button[action=inspAction]'		: { click : me.inspAction   },	// 신규
			'module-noticeview-lister-master button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-noticeview-lister-master' : {
				itemdblclick: me.selectLister
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-noticeview-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-noticeview-search')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-noticeview-editor')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-noticeview-lister-master')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-noticeview-popup')[0] }
	},

	//추가팝업
	inspAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			popup  = me.pocket.popup(),
			invc_numb
		;
		var me = this
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method		: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'ntce_view'
				})
			},
			async	: false,
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
			widget : 'module-noticeview-popup',
			params : {	invc_numb : invc_numb,
				empy_idcd		: _global.login_id,
				ansr_cont		: '',
				insp_yorn		: '',
				insp_dttm		: '',
				_set			:'insert'
			}
		});
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search = me.pocket.search(),
			param = search.getValues()

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id , empy_idcd : _global.login_pk}) );
	},

	//팝업선택
	selectLister : function(grid, record) {
		var me = this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster()
			popup			= me.pocket.popup()
			record			= listermaster.getSelectionModel().getSelection()[0],
			mrecords		= listermaster.getSelectionModel().getSelection()
		;
		if(mrecords[0]){
			resource.loadPopup({
				widget : 'module-noticeview-popup',
				params : {
					invc_numb	:mrecords[0].data.invc_numb,
					pswd		:mrecords[0].data.pswd,
					ansr_yorn	:mrecords[0].data.ansr_yorn,
					emgc_yorn	:mrecords[0].data.emgc_yorn,
					scrt_yorn	:mrecords[0].data.scrt_yorn,
					ntce_cont	:mrecords[0].data.ntce_cont,
					ntce_eddt	:mrecords[0].data.ntce_eddt,
					ntce_stdt	:mrecords[0].data.ntce_stdt,
					dwup_empy_name	:mrecords[0].data.dwup_empy_name,
					sbsd_ttle	:mrecords[0].data.sbsd_ttle,
					ansr_cont	:mrecords[0].data.ansr_cont,
					ntce_ttle	:mrecords[0].data.ntce_ttle,
					dwup_date	:mrecords[0].data.dwup_date,
					user_memo	:mrecords[0].data.user_memo,
					_set		:'update'
				}
			});
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	}
});