Ext.define('module.prod.cvic.cvicmast.CvicMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.LaboRatePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CvicChckTypePopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.class.ClssMastPopup'
	],

	models : [	'module.prod.cvic.cvicmast.model.CvicMast',
				'module.prod.cvic.cvicmast.model.CvicMastFile'
	],

	stores : [	'module.prod.cvic.cvicmast.store.CvicMast',
				'module.prod.cvic.cvicmast.store.CvicMastFile'
	],
	views  : [	'module.prod.cvic.cvicmast.view.CvicMastLayout',
				'module.prod.cvic.cvicmast.view.CvicMastSearch',
				'module.prod.cvic.cvicmast.view.CvicMastLister',
				'module.prod.cvic.cvicmast.view.CvicMastEditor',
				'module.prod.cvic.cvicmast.view.CvicMastEditorLister'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cvicmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-cvicmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-cvicmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-cvicmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-cvicmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-cvicmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-cvicmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-cvicmast-lister button[action=amendAction]' : { click : me.amendAction },	// 일상점검표 출력
			'module-cvicmast-lister button[action=copyAction]' : { click : me.copyAction },		// 연간점검표 출력
			// lister event
			'module-cvicmast-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-cvicmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cvicmast-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-cvicmast-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-cvicmast-editor')[0] },
		editorlister : function () { return Ext.ComponentQuery.query('module-cvicmast-editorlister')[0] }
	},


	//조회
	selectAction:function() {
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
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		if(record[0] == null){
			return;
		}else{
			var me = this,
				editor = me.pocket.editor(),
				editorlister = me.pocket.editorlister()
			;
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('cvic_idcd'),orgn_dvcd : 'cvic_mast' });
			editorlister.down('[name=file]').popup.params.invc_numb = record[0].get('cvic_idcd');
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			editorlister = me.pocket.editorlister(),
			param = search.getValues()
		;
		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image2]').setSrc('');
		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);
		editorlister.down('[name=file]').popup.params.invc_numb = "";

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'cvic_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							cvic_idcd : keygen.records[0].code
						}),
						lister		: lister,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
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
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
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
									table_nm	: 'cvic_mast',
									lcls_idcd	: record.get('lcis_idcd'),
									mcls_idcd	: record.get('mcls_idcd'),
									scls_idcd	: record.get('scls_idcd')
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cvic_idcd' , keygen.records[0].code );
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
		var	uploadForm = editor.down('[name=uploadForm]'),
			select     = lister.getSelectionModel().getSelection()[0],
			cvic_idcd  = '',
			cvic_imge_1fst  = editor.down('[name=image]').src,
			cvic_imge_2snd = editor.down('[name=image2]').src,
			chek1	   = editor.down('[name=imge_chek1]').getValue(),
			chek2	   = editor.down('[name=imge_chek2]').getValue(),
			param={},
			chk1=0, chk2=0
		;
		cvic_idcd  = editor.down('[name=cvic_idcd]').getValue();
		var used_year  = editor.down('[name=used_year]').getValue();
		if(isNaN(used_year)){
			Ext.Msg.alert("알림","숫자만 입력하여 주시기 바랍니다.");
			me.down('[name=used_year]').setValue('0');
			return;
		}

		if(cvic_imge_1fst){
			if(chek1 == "" || chek1 == undefined){
				chk1 = 3;
			}
			else{
				chk1 = 1;
			}
		}
		if(cvic_imge_2snd){
			if(chek2 == "" || chek2 == undefined){
				chk2=3;
			}else{
				chk2 = 1;
			}
		}

		param.stor_grp  = _global.stor_grp;
		param.stor_id   = _global.stor_id;
		param.cvic_idcd = cvic_idcd;
		param.chk1		= chk1;
		param.chk2		= chk2;
		Ext.merge(param, this.params);
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
		//submit
		uploadForm.getForm().submit({
			waitMsg:this.waitMsg, // progressbar 띄우기
			success:function(form, action){
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
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
	},

	// 일상점검표 출력
	amendAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'CvicMonthlyCheck.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "설비코드목록 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'cvic_idcd\':\''+record[i].get('cvic_idcd')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;

	},

	// 연간점검표 출력
	copyAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'CvicAnnualCheck.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "설비코드목록 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'cvic_idcd\':\''+record[i].get('cvic_idcd')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	}
});
