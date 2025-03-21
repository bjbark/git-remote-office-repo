Ext.define('module.custom.iypkg.sale.sale.rqstwork.RqstWork', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload'
	],
	models	: [
		'module.custom.iypkg.sale.sale.rqstwork.model.RqstWork',
		'module.custom.iypkg.sale.sale.rqstwork.model.RqstWorkLister2',
		'module.custom.iypkg.sale.sale.rqstwork.model.RqstWorkWorkerLister'
	],
	stores	: [
		'module.custom.iypkg.sale.sale.rqstwork.store.RqstWork',
		'module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkLister2',
		'module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkWorkerLister'
	],
	views	: [
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLayout',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLister',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLister2',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkSearch',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerEditor',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerLister',
		'module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-rqstwork-layout #mainpanel'								: { tabchange : me.mainTabChange },
			'module-rqstwork-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-rqstwork-worker-editor button[action=selectAction2]'	: { click : me.selectAction2 },	//조회2

			'module-rqstwork-search button[action=clickHometax]'			: { click : me.clickHometax },
			'module-rqstwork-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-rqstwork-lister button[action=deleteAction]'			: { click : me.deleteAction },
			'module-rqstwork-lister button[action=printAction]'				: { click : me.printAction	},	//홈택스 업로드 양식발행
			'module-rqstwork-lister button[action=uploadExcelAction]'		: { click : me.uploadExcelAction	},	//홈택스 업로드 양식발행

			'module-rqstwork-lister2 button[action=exportAction]'			: { click : me.exportAction },

			'module-rqstwork-worker-lister button[action=updateAction]'		: { click : me.updateAction },
			'module-rqstwork-worker-lister button[action=cancelAction]'		: { click : me.cancelAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-rqstwork-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-rqstwork-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-rqstwork-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-rqstwork-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-rqstwork-lister2')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-rqstwork-worker-lister')[0] },
		listereditor: function () { return Ext.ComponentQuery.query('module-rqstwork-worker-editor')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-rqstwork-worker-search')[0] }
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;
		if (index > 1) {
			me.pocket.search().down('[name=detailSelect]').collapse();
		}else{
			me.selectAction();
		}
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==0){
			lister = me.pocket.lister();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '1'}) );
		}else if(tindex==1){
			lister = me.pocket.lister2();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '2'}) );
		}else if(tindex==2){
			Ext.Msg.alert("알림","청구등록의 청구대기 자료 가져오기로 조회하여 주십시오.");
		}

	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.listermaster(),
			search = me.pocket.listereditor(),
			param  = search.getValues()
		;
		if(param.deli_date1>param.deli_date2 || param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","일자를 다시입력해 주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						mask.hide();
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			callback : function(results){
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		}, me);
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues(),
			editorlister = me.pocket.editorlister(),
			drtr = me.pocket.drtr_lister(),
			deli = me.pocket.deli_lister()
		;
		drtr.getStore().clearData();
		drtr.getStore().loadData([],false);

		deli.getStore().clearData();
		deli.getStore().loadData([],false);

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
						table_nm	: 'cstm_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							cstm_idcd : keygen.records[0].seq,
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function (results) {
							if (results.success) {
								results.feedback({success : true , visible : true });
							}
						}
					});

				}
			}
		});
	},


	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			lister = me.pocket.listermaster(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			updateRecords = lister.getStore().getUpdatedRecords(),
			search = me.pocket.listersearch(),
			editor = me.pocket.listereditor(),
			param  = search.getValues(),
			cstm_idcd = editor.getValues().cstm_idcd,
			rqod_rcvd_dvcd = search.getValues().rqod_rcvd_dvcd,
			new_invc_numb, new_line_seqn,
			new_colt_numb, new_colt_seqn,
			new_txbl_numb, new_txbl_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk
		;

		for (var i = 0; i < changes; i++) {
			if(updateRecords[0].get('cstm_idcd') != updateRecords[i].get('cstm_idcd')){
				chk=2;
				break;
			}
			if(updateRecords[0].get('sale_qntt') == 0){
				chk = 1;
				break;
			}
		}
		if(changes != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
				return;
			}else if(chk==2){
				Ext.Msg.alert("알림","거래처를 확인해주세요.같은 거래처인 청구대기 자료만 등록가능합니다.");
				return;
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'sale_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;

						if(rqod_rcvd_dvcd == '2'){ // 영수
							Ext.Ajax.request({
								url			: _global.location.http() + '/listener/seq/maxid.do',
								params		: {
									token	: _global.token_id ,
									param	: JSON.stringify({
										stor_id	: _global.stor_id,
										table_nm: 'colt_mast'
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									new_colt_numb = result.records[0].seq;
								}
							});
						}
						Ext.Ajax.request({
							url			: _global.location.http() + '/listener/seq/maxid.do',
							params		: {
								token	: _global.token_id ,
								param	: JSON.stringify({
									stor_id	: _global.stor_id,
									table_nm: 'txbl_mast'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								new_txbl_numb = result.records[0].seq;
									Ext.Ajax.request({
										url			: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqn.do',
										params		: {
											token	: _global.token_id ,
											param	: JSON.stringify({
												stor_id	: _global.stor_id,
												table_nm: 'txbl_mast'
											})
										},
										async	: false,
										method	: 'POST',
										success	: function(response, request) {
											var result = Ext.decode(response.responseText);
											new_txbl_seqn = Number(result.records[0].txbl_seqn);
										}
									});
							}
						});
					}
				});

				var x = 1;	//순번
				for (var a = 0; a < changes; a++) {
					if(rqod_rcvd_dvcd == '2'){
						lister.getStore().getUpdatedRecords()[a].data.new_colt_seqn = x;
						lister.getStore().getUpdatedRecords()[a].data.new_colt_numb = new_colt_numb;
					}
					lister.getStore().getUpdatedRecords()[a].data.new_txbl_seqn = new_txbl_seqn++;
					lister.getStore().getUpdatedRecords()[a].data.new_txbl_numb = new_txbl_numb;
					lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
					lister.getStore().getUpdatedRecords()[a].data.invc_date = param.invc_date;
					lister.getStore().getUpdatedRecords()[a].data.rqod_rcvd_dvcd = param.rqod_rcvd_dvcd;
				}

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();

				var store = lister.getStore();
				lister.getStore().sync({
					success : function(operation){
						tpanel.items.indexOf(tpanel.setActiveTab(0));
						lister.getStore().reload();
						search.getForm().reset(true);
						editor.getForm().reset(true);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
						me.pocket.lister().getStore().reload();
					}
				});
			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	//취소
	cancelAction:function() {
		var me = this,
		lister = me.pocket.listermaster(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
		search = me.pocket.listersearch()
	;
	tpanel.items.indexOf(tpanel.setActiveTab(0));
	search.getForm().reset(true);
	},

	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},			// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }											// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},
	uploadExcelAction:function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection(),
			records = '';
		;
		if(select[0]){

			records += '['
			var i = 0;
			Ext.each(select,function(record){
				records += '{\'invc_numb\':\''+record.get('invc_numb')+'\', \'line_seqn\':'+record.get('line_seqn')+'}';
				if(i < (select.length-1) ){
					records += ', ';
				}
				i++;
			});
			records += ']';

			Ext.Ajax.request({
				url		: _global.location.http() + '/upload/set/hometaxExcel.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						records			: records,
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
						var file_name = result.records[0].file_name;
						window.open('./resource/downloadFile/'+file_name,'download');
						setTimeout(function(){
							Ext.Ajax.request({
								url		: _global.location.http() + '/upload/set/localDelete.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										file_name		: file_name,
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
										console.log(result);
									}
								},
								failure : function(result, request) {
									Ext.Msg.error(result.mesage);
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							})
						},60000);
					}
				},
				failure : function(result, request) {
					Ext.Msg.error(result.mesage);
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}else{
			Ext.Msg.alert('알림','청구리스트를 선택해주세요.');
		}
	},

	printAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection(),
			record	= lister.getSelectionModel().getSelection(),
			jrf1 = "daea_rqstwork_1.jrf,daea_rqstwork_2.jrf",
			changes = lister.getStore().getUpdatedRecords().length,
			resId = _global.hq_id.toUpperCase(),
			store  = lister.getStore()

		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처가 같은 목록들을 선택해주십시오.");
				checked = 1
				return;
			}
		}


			if (!records || records.length==0) {
				Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
				return;
			}


//			if(changes != 0){
//				var i = 0, cstm = '',chk = 0;
//			store.each(function(record){
//				if(i==0){
//					cstm = record[0].get('cstm_idcd');
//				}else{
//					if(record[0].get('cstm_idcd')!=cstm){
//						chk=1;
//						return;
//					}
//				}
//			});
//			if(chk==1){
//				Ext.Msg.alert('알림','거래처가 다른 품목은 같이 출고할 수 없습니다.');
//				return;
//			}
//			}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		if(select){
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf1+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},


	clickHometax : function (btnObj) {
		var me = this;
		var ret = window.open("https://www.hometax.go.kr","toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=800,height=600");
	},

	exportAction : function(button){
		var value = button.button ;
		if(button.itemId == 'lister'){
			this.pocket.lister().writer({enableLoadMask:true});
		}else{
			this.pocket.lister2().writer({enableLoadMask:true});
		}
	}
});

