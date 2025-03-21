Ext.define('module.custom.hantop.item.bommast.BomMast', { extend:'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.HntopItemClorPopup',
		'lookup.popup.view.HantopKeypadPopup'
	],
	models		: [
		'module.custom.hantop.item.bommast.model.BomMast',
		'module.custom.hantop.item.bommast.model.BomMastDetail1',
		'module.custom.hantop.item.bommast.model.BomMastDetail2',
		'module.custom.hantop.item.bommast.model.BomMastDetail3',
		'module.custom.hantop.item.bommast.model.BomMastDetail4',
	],
	stores		: [
		'module.custom.hantop.item.bommast.store.BomMast',
		'module.custom.hantop.item.bommast.store.BomMastDetail1',
		'module.custom.hantop.item.bommast.store.BomMastDetail2',
		'module.custom.hantop.item.bommast.store.BomMastDetail3',
		'module.custom.hantop.item.bommast.store.BomMastDetail4',
	],
	views		: [
		'module.custom.hantop.item.bommast.view.BomMastLayout',
		'module.custom.hantop.item.bommast.view.BomMastSearch',
		'module.custom.hantop.item.bommast.view.BomMastMaster',
		'module.custom.hantop.item.bommast.view.BomMastDetail1',
		'module.custom.hantop.item.bommast.view.BomMastDetail2',
		'module.custom.hantop.item.bommast.view.BomMastImage',
		'module.custom.hantop.item.bommast.view.BomMastDetail3',
		'module.custom.hantop.item.bommast.view.BomMastDetail4',
		'module.custom.hantop.item.bommast.view.BomMastEditor',
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-bommast-layout  button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-bommast-detail3 button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-bommast-detail3 button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-bommast-detail3 button[action=insertAction]' : { click : me.insertAction },	// 추가
			'module-bommast-detail3 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-bommast-detail4 button[action=bomCreateAction]' : { click : me.bomCreateAction },	// bom작성

			// editor 이벤트
			'module-bommast-editor  button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-bommast-editor  button[action=cancelAction]' : { click : me.cancelAction },	// 취소

			// 클릭이벤트
			'module-bommast-master'		: {
				selectionchange	: me.selectMaster
			},

			'module-bommast-detail1'	: {
				selectionchange	: me.selectRecord,
			},

			'module-bommast-detail2'	: {
				selectionchange	: me.selectRecord2,
			},

			'module-bommast-detail4'	: {
				selectionchange	: me.selectRecord4
			},


			'module-bommast-detail3'	: {
				selectionchange	: me.selectRecord3
			},

		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-bommast-layout')  [0] },
		search		: function () { return Ext.ComponentQuery.query('module-bommast-search')  [0] },
		master		: function () { return Ext.ComponentQuery.query('module-bommast-master')  [0] },
		detail1		: function () { return Ext.ComponentQuery.query('module-bommast-detail1') [0] },
		detail2		: function () { return Ext.ComponentQuery.query('module-bommast-detail2') [0] },
		detail4		: function () { return Ext.ComponentQuery.query('module-bommast-detail4') [0] },
		detail3		: function () { return Ext.ComponentQuery.query('module-bommast-detail3') [0] },
		editor		: function () { return Ext.ComponentQuery.query('module-bommast-editor')  [0] },
		image		: function () { return Ext.ComponentQuery.query('module-bommast-image')   [0] },

	},

	//조회
	selectAction : function() {
		var me = this,
			search	= me.pocket.search(),
			lister	= me.pocket.master(),
			detail1	= me.pocket.detail1(),
			detail2	= me.pocket.detail2(),
			detail3	= me.pocket.detail3(),
			editor	= me.pocket.editor(),
			param	= search.getValues(),
			image	= me.pocket.image()
		;

		find_name = search.down('[name=find_name]').getValue();

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		image.down('[name=imge_1fst]').setSrc('');

		detail3.getStore().clearData();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		detail1.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//브랜드 클릭시 초기화
	selectMaster:function(gird, record){
		var me = this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail4 = me.pocket.detail4(),
			detail3 = me.pocket.detail3(),
			master = me.pocket.master(),
			editor = me.pocket.editor(),
			image = me.pocket.image(),
			param	= me.pocket.search().getValues(),
			detail1select = detail1.getSelectionModel().getSelection()[0],
			masterSelect = master.getSelectionModel().getSelection()[0]
		;

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
		detail4.getStore().clearData();
		detail4.getStore().loadData([],false);
		detail3.getRootNode().removeAll();

		image.down('[name=imge_1fst]').setSrc('');

		if(record[0]&&detail1select){
			if(record[0]!=''){
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				},Ext.merge( param, {stor_id : _global.stor_id
					, brnd_bacd : masterSelect.data.brnd_bacd
					, wdgr_idcd : detail1select.data.wdgr_idcd}) );
			}
		}
	},


	detail1Record:function(){
		var me = this,
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			param	= me.pocket.search().getValues(),
			masterselect = me.pocket.master().getSelectionModel().getSelection()[0]
		;


	},

	//선택(창호그룹)
	selectRecord:function( grid, record ){
		var me = this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			param	= me.pocket.search().getValues(),
			masterselect = me.pocket.master().getSelectionModel().getSelection()[0],
			detail1select = detail1.getSelectionModel().getSelection()[0]
		;
		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
		detail4.getStore().clearData();
		detail4.getStore().loadData([],false);
		detail3.getRootNode().removeAll();

		if(masterselect && detail1select){
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			},Ext.merge( param, {stor_id : _global.stor_id
				, brnd_bacd : masterselect.data.brnd_bacd
				, wdgr_idcd : record[0].data.wdgr_idcd})
			);
		}
	},

	selectRecord2:function( grid, record ){
		var me = this,
		detail1 = me.pocket.detail1(),
		detail2 = me.pocket.detail2(),
		detail3 = me.pocket.detail3(),
		detail4 = me.pocket.detail4(),
		editor  = me.pocket.editor(),
		param	= me.pocket.search().getValues(),
		masterselect = me.pocket.master().getSelectionModel().getSelection()[0]
		detail1select = detail1.getSelectionModel().getSelection()[0]
		detail2select = detail2.getSelectionModel().getSelection()[0]
		;

		detail3.getRootNode().removeAll();
		detail4.getStore().clearData();
		detail4.getStore().loadData([],false);

		if(masterselect && detail1select){
			if(record[0]){
				detail4.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				},Ext.merge( param, {stor_id : _global.stor_id
					, wdgr_idcd : record[0].data.wdgr_idcd}) );
			}
		}else{
			if(!masterselect)Ext.Msg.alert("알림","브랜드를 선택하여주십시오.");
			if(!detail1select)Ext.Msg.alert("알림","창호그룹을 선택하여주십시오.");
		}

	},

	// 선택(이미지,BOM목록)
	selectRecord4:function(grid, record){
		var me = this,
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			detail2 = me.pocket.detail2(),
			editor  = me.pocket.editor(),
			image = me.pocket.image(),
			param = me.pocket.search().getValues(),
			masterselect = me.pocket.master().getSelectionModel().getSelection()[0],
			detail1select = me.pocket.detail1().getSelectionModel().getSelection()[0],
			detail2select = detail2.getSelectionModel().getSelection()[0],
			detail4select = me.pocket.detail4().getSelectionModel().getSelection()[0]
		;
		detail3.getRootNode().removeAll();

		if (record[0]) {
			detail3.getStore().load({
				params:{
					param : JSON.stringify({
					wndw_modl_idcd: detail2select.get("wndw_modl_idcd"),
					wdtp_idcd     : record[0].data.wdtp_idcd
				})
			}, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						detail3.getRootNode().expand();
						detail3.getSelectionModel().select(0);
					} else {
					}
				}
			});
		}
	},

	// bom목록선택
	selectRecord3:function( grid, record ){
		var me = this,
			editor = me.pocket.editor();

		editor.selectRecord({ lister : me.pocket.detail3(), record : record }, me);
	},

	// 추가
	insertAction:function() {
		var me = this,
			editor	= me.pocket.editor(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			detail1select = detail1.getSelectionModel().getSelection()[0],
			detail2select = detail2.getSelectionModel().getSelection()[0],
			detail3select = detail3.getSelectionModel().getSelection()[0],
			detail4select = detail4.getSelectionModel().getSelection()[0],
			masterselect  = me.pocket.master().getSelectionModel().getSelection()[0],
			param	= me.pocket.search().getValues(),
			seq=1, prnt_idcd, line_levl, line_ordr
		;
		editor.getForm().reset();
		console.log(detail3select.data.item_idcd);

		editor.down('[name=item_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' , rpst_item_idcd: detail3select.data.item_idcd };

		if(!masterselect){
			Ext.Msg.alert("알림","브랜드를 선택하여주십시오.");
			return;
		}
		if(!detail1select){
			Ext.Msg.alert("알림","창호그룹을 선택하여주십시오.");
			return;
		}
		if(!detail2select){
			Ext.Msg.alert("알림","창호모델을 선택하여주십시오.");
			return;
		}
		if(!detail4select){
			Ext.Msg.alert("알림","창호형태를 선택하여주십시오.");
			return;
		}

		if(!detail3select){
			line_levl = '1';
		}else{
//			if(detail3select.data.acct_bacd == '1001' || detail3select.data.acct_bacd == '1002' || detail3select.data.acct_bacd == '1003'){
//				var acct = '',
//					acct_bacd = detail3select.data.acct_bacd
//				;
//				if(acct_bacd == '1001'){
//					acct = '[<span style="color:blue;">원자재</span>]는 ';
//				}else if(acct_bacd == '1002'){
//					acct = '[<span style="color:blue;">부자재</span>]는 ';
//				}else if(acct_bacd == '1003'){
//					acct = '[<span style="color:blue;">소모품</span>]은 ';
//				}
//				Ext.Msg.alert("알림",acct + "하위 품목을 가질 수 없는 품목입니다.");
//				return;
//			}
			prnt_idcd = detail3select.data.item_idcd;
			line_levl = detail3select.data.line_levl + 1
		}
		// line_seq의 max+1을 구하기
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/hantop/item/bommast/get/seq.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					wndw_modl_idcd	: detail2select.data.wndw_modl_idcd,
					wdtp_idcd		: detail4select.data.wdtp_idcd,
					wndw_itid		: detail3select.data.item_idcd,
				})
			},
			async	: false,
			success : function(response, request) {
				var result = Ext.decode(response.responseText);
				if(result.success ){
					seq       = result.records[0].seq + 1;
					line_ordr = detail3select.data.line_ordr + 1;

					editor.insertBefore({
						caller	: me,
						keygen	: {
							url			: _global.location.http() + '/listener/seq/maxid.do',
							object		: resource.keygen,
							params		: {
								token	: _global.token_id ,
								param	: JSON.stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'wind_bom'
								})
							}
						},
						callback : function (keygen){
							if (keygen.success){
								editor.insertRecord({
									caller	: me,
									record	: Ext.create( detail3.getStore().model.modelName,{
										line_seqn : seq,
										line_ordr : line_ordr,
										prnt_idcd : prnt_idcd,
										line_levl : line_levl,
										bfsf_dvcd : detail3select.data.bfsf_dvcd,
										brnd_name : masterselect.data.brnd_name,
										brnd_bacd : masterselect.data.brnd_bacd,
										wdgr_name : detail1select.data.wdgr_name,
										wdgr_idcd : detail1select.data.wdgr_idcd,
										modl_name : detail2select.data.modl_name,
										wndw_modl_idcd : detail2select.data.wndw_modl_idcd,
										wdtp_idcd : detail4select.data.wdtp_idcd,
										wndw_itid : detail3select.data.item_idcd,
										uper_seqn : detail3select.data.line_seqn,
										esnt_yorn : '1',
										_set      : 'insert',
									}),
									lister	: detail3,
									disables: [ me.pocket.layout().down('#mainpanel'),
												me.pocket.layout().down('#servepanel'),
												me.pocket.search().setDisabled(true)],
									callback: function (results){
										if (results.success) {
											results.feedback({success : true , visible : true });
										}
									}
								});
							}
						}
					});
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});


	},

	// 수정
	modifyAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			masterselect = me.pocket.master().getSelectionModel().getSelection()[0],
			detail1select = me.pocket.detail1().getSelectionModel().getSelection()[0],
			detail2select = me.pocket.detail2().getSelectionModel().getSelection()[0],
			detail3select = me.pocket.detail3().getSelectionModel().getSelection()[0]
		;
		editor.down('[name=item_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' , rpst_item_idcd: detail3select.data.prnt_idcd };

		if(!masterselect){
			Ext.Msg.alert("알림","브랜드를 선택하여주십시오.");
			return;
		}else{
			editor.down('[name=brnd_name]').setValue(masterselect.data.brnd_name);
			editor.down('[name=brnd_bacd]').setValue(masterselect.data.brnd_bacd);
		}
		if(!detail1select){
			Ext.Msg.alert("알림","창호그룹을 선택하여주십시오.");
			return;
		}else{
			editor.down('[name=wdgr_name]').setValue(detail1select.data.wdgr_name);
			editor.down('[name=wdgr_idcd]').setValue(detail1select.data.wdgr_idcd);
		}
		if(!detail2select){
			Ext.Msg.alert("알림","창호모델을 선택하여주십시오.");
			return;
		}else{
			editor.down('[name=modl_name]').setValue(detail2select.data.modl_name);
			editor.down('[name=wndw_modl_idcd]').setValue(detail2select.data.wndw_modl_idcd);
		}
		if(!detail3select){
			Ext.Msg.alert("알림","수정할 BOM이 없습니다. 수정할 BOM을 선택하여주십시오.");
			return;
		}
		if(detail3select.data.item_idcd == 'wind_assi_mtrl' || detail3select.data.item_idcd == 'wind_bf' || detail3select.data.item_idcd == 'wind_mf' || detail3select.data.item_idcd == 'wind_sf'){
			Ext.Msg.alert("알림","수정할 수 없는 품목입니다.");
			return;
		}
		editor.down('[name=_set]').setValue('update');

		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true });
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.layout().down('#servepanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	// 삭제
	deleteAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			detail3 = me.pocket.detail3(),
			detail3select = detail3.getSelectionModel().getSelection()[0]
		;
		if(detail3select.data.item_idcd == 'wind_assi_mtrl' || detail3select.data.item_idcd == 'wind_bf'
			|| detail3select.data.item_idcd == 'wind_mf' || detail3select.data.item_idcd == 'wind_sf'){
			Ext.Msg.alert("알림","삭제할 수 없는 품목입니다.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hantop/item/bommast/set/record.do',
			params	: {
				token : _global.token_id,
				param	: Ext.encode({
					stor_id          : _global.stor_id,
					hqof_idcd        : _global.hqof_idcd,
					wndw_modl_idcd   : detail3select.data.wndw_modl_idcd,
					wdtp_idcd        : detail3select.data.wdtp_idcd,
					wndw_itid        : detail3select.data.wndw_itid,
					line_seqn        : detail3select.data.line_seqn,
					_set             : 'delete',
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
					detail3.getStore().load({
						params:{
							param:JSON.stringify({
								wndw_modl_idcd   : detail3select.data.wndw_modl_idcd,
								wdtp_idcd        : detail3select.data.wdtp_idcd,
							})
						}
					, scope:me,
					callback:function(records, operation, success) {
						if (success) {
							tree.getRootNode().expand();
							tree.getSelectionModel().select(0);
						} else {
						}
					}
				});
			}
		},
		failure : function(result, request) {
		},
		callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
		}
	});
	},

	// 저장
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			detail3		= me.pocket.detail3(),
			detail3_store = detail3.getStore(),
			values		= editor.getForm().getValues()
		;
		if(values.item_idcd == '' || values.item_idcd == null){
			Ext.Msg.alert("알림","투입품목을 선택하여 주십시오.");
			return;
		}
		if(values.bfsf_dvcd != ''){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/bommast/set/record.do',
				params	: {
					token : _global.token_id,
					param	: Ext.encode({
						stor_id          : _global.stor_id,
						hqof_idcd        : _global.hqof_idcd,
						wndw_modl_idcd   : values.wndw_modl_idcd,
						wdtp_idcd        : values.wdtp_idcd,
						wndw_itid        : values.wndw_itid,
						line_seqn        : values.line_seqn,
						ivst_item_idcd   : values.item_idcd,
						ivst_item_name   : values.item_name,
						ivst_item_spec   : values.item_spec,
						item_code        : values.item_code,
						acct_bacd        : values.acct_bacd,
						bfsf_dvcd        : values.bfsf_dvcd,
						esnt_yorn        : values.esnt_yorn,
						calc_frml        : values.calc_frml,
						need_qntt        : values.need_qntt,
						user_memo        : values.user_memo,
						prnt_idcd        : values.prnt_idcd,
						line_levl        : values.line_levl,
						uper_seqn        : values.uper_seqn,
						_set             : values._set,
						updt_idcd        : _global.login_pk,
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
						detail3.getStore().load({
							params:{
								param:JSON.stringify({
									wndw_modl_idcd : values.wndw_modl_idcd,
									wdtp_idcd      : values.wdtp_idcd,
									wndw_itid      : values.wndw_itid
								})
							}
						, scope:me,
						callback:function(records, operation, success) {
							if (success) {
								detail3.getRootNode().expand();
								detail3.getSelectionModel().select(0);
								me.pocket.layout().down('#mainpanel').setDisabled(false);
								me.pocket.layout().down('#servepanel').setDisabled(false);
								me.pocket.search().setDisabled(false);
								editor.collapse(false);
							} else {
							}
						}
					});
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			},
		});

		}else{
			Ext.Msg.alert("알림","틀.짝.망을 선택하여 주십시오.");
		}
	},

	// BOM 작성
	bomCreateAction:function() {
		var me		= this,
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			detail1select = detail1.getSelectionModel().getSelection()[0],
			detail2select = detail2.getSelectionModel().getSelection()[0],
			detail3select = detail3.getSelectionModel().getSelection()[0],
			detail4select = detail4.getSelectionModel().getSelection()[0],
			masterselect  = me.pocket.master().getSelectionModel().getSelection()[0],
			records = []
		;

		if(masterselect.get('brnd_bacd') == '' || masterselect.get('brnd_bacd') == null){
			Ext.Msg.alert("알림","브랜드를 선택하여 주십시오.");
			return;
		}
		if(detail2select.get('wndw_modl_idcd') == '' || detail2select.get('wndw_modl_idcd') == null){
			Ext.Msg.alert("알림","모델을 선택하여 주십시오.");
			return;
		}
		if(detail4select.get('wdtp_idcd') == '' || detail4select.get('wdtp_idcd') == null){
			Ext.Msg.alert("알림","창호형태를 선택하여 주십시오.");
			return;
		}

		records.push({
				stor_id          : _global.stor_id,
				hqof_idcd        : _global.hqof_idcd,
				brnd_bacd        : masterselect.get('brnd_bacd'),
				wndw_modl_idcd   : detail2select.get('wndw_modl_idcd'),
				wdtp_idcd        : detail4select.get('wdtp_idcd'),
			});

		Ext.Msg.confirm('확인','BOM작성시 기존 BOM목록은 초기화 됩니다. 진행하시겠습니까?',  function(button) {
			if (button === 'yes'){
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/hantop/item/bommast/set/write.do',
					params	: {
						token : _global.token_id,
						param	: JSON.stringify({
							param : JSON.stringify({
								records : records
							})
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
							detail3.getStore().load({
								params:{
									param : JSON.stringify({
										wndw_modl_idcd: detail2select.get('wndw_modl_idcd'),
										wdtp_idcd     : detail4select.get('wdtp_idcd')
									})
								}, scope:me,
								callback:function(records, operation, success) {
									if (success) {
										detail3.getRootNode().expand();
										detail3.getSelectionModel().select(0);
									} else {
									}
								}
							});
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					},
				});
			}
		});
	},

	// 취소
	cancelAction:function() {
		var me	= this,
			editor = me.pocket.editor(),
			detail3 = me.pocket.detail3(),
			detail3_store = me.pocket.detail3().getStore()
		;

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.detail3(),
			callback : function( results ) {
				detail3_store.reload();
				results.feedback( {success : true, visible : true, selectRecord3 : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#servepanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);

	},

	//엑셀
	exportAction : function(){
		this.pocket.detail3().writer({enableLoadMask:true});
	},

});