Ext.define('module.custom.dehansol.sale.saleorder.SaleOrder', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.DehanCstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupDehansol',
		'lookup.popup.view.WkctPopup',
	 	'Axt.ux.grid.FiltersFeature',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.dehansol.sale.saleorder.model.SaleOrderMaster',
		'module.custom.dehansol.sale.saleorder.model.SaleOrderFile'
	],
	stores:[
		'module.custom.dehansol.sale.saleorder.store.SaleOrderMaster',
		'module.custom.dehansol.sale.saleorder.store.SaleOrderFile'
	],
	views : [
		'module.custom.dehansol.sale.saleorder.view.SaleOrderLayout',
		/* 현황 */
		'module.custom.dehansol.sale.saleorder.view.SaleOrderSearch',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderListerMaster',
		/* 작업 */
		'module.custom.dehansol.sale.saleorder.view.SaleOrderCopyPopup',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderLabelPopup',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderReleasePopup',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderFilmPopup',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderFile',
		'module.custom.dehansol.sale.saleorder.view.SaleOrderEditor',
		'module.custom.dehansol.sale.saleorder.view.FileUpload',
		'module.custom.dehansol.sale.saleorder.view.FileUpload2'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleorder-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-saleorder-layout #mainpanel'									: { tabchange : me.mainTabChange  },

			'module-saleorder-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-saleorder-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */

			'module-saleorder-lister-master button[action=RestoreAction]'			: { click : me.RestoreAction      }, /* 데이터복원 */
			'module-saleorder-lister-master button[action=LabelAction]'				: { click : me.LabelAction        }, /* 라벨발행 */
			'module-saleorder-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 수주복사 */
			'module-saleorder-lister-master button[action=FilmAction]'				: { click : me.FilmAction         }, /* 필름수령*/
			'module-saleorder-lister-master button[action=InspReportAction]'		: { click : me.InspReportAction   }, /* 검사성적서발행*/
			'module-saleorder-lister-master button[action=InvoiceAction]'			: { click : me.InvoiceAction      }, /* 거래명세서발행 */
			'module-saleorder-lister-master button[action=ReleaseAction]'			: { click : me.ReleaseAction      }, /* 출고지시 */
			'module-saleorder-lister-master button[action=ReleaseCancelAction]'		: { click : me.ReleaseCancelAction}, /* 출고취소 */
			'module-saleorder-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-saleorder-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-saleorder-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-saleorder-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */

			'module-saleorder-editor button[action=updateAction]'					: { click : me.updateAction       }, // 저장
			'module-saleorder-editor button[action=cancelAction]'					: { click : me.cancelAction       }, // 취소

			'module-saleorder-lister-master menuitem[action=uploadAction]'			: { click : me.excelUploadAction  }, /* 대덕전자  excel*/
			'module-saleorder-lister-master menuitem[action=uploadAction2]'			: { click : me.excelUploadAction2 }, /* TLB excel*/
			'module-saleorder-lister-master menuitem[action=uploadAction3]'			: { click : me.excelUploadAction3 }, /* 기타업체 excel*/
			'module-saleorder-lister-master menuitem[action=uploadAction4]'			: { click : me.excelUploadAction4 }, /* 코리아써키트2공장 excel*/
			'module-saleorder-lister-master menuitem[action=uploadAction5]'			: { click : me.excelUploadAction5 }, /* 코리아써키트3공장 excel*/

			'module-saleorder-lister-master' : {
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			}


		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-saleorder-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-saleorder-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-saleorder-editor')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-saleorder-lister-master')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-saleorder-copy-popup')[0] },
		file  : function () { return Ext.ComponentQuery.query('module-saleorder-file')[0] }
	},


	RestoreAction:function(callbackFn) {
		var me = this,
		select = me.pocket.lister.master().getSelectionModel().getSelection(),
		master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_stat") == "0") {
					err_msg = "삭제된 데이터가 아닙니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "복원할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 데이터를 복원하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_stat', '0');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/restore.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_seqn		: record.get('line_seqn'),
										line_stat		: '0',
										table			: 'acpt_item',
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
										master.getStore().reload();
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

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
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
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'acpt_mast'
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

	//마감해지
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
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
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'acpt_mast'
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

	selectAction:function(callbackFn) {
		var me = this,
			lister = me.pocket.lister.master(),
			search = me.pocket.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			values = me.pocket.search().getValues(),
			param = search.getValues()
		;

		if(tindex==1){
			Ext.Msg.alert("알림","수주현황에서 조회해주십시오.");
		}else if(values.invc_date1>values.invc_date2){
			Ext.Msg.alert("알림","수주일자를 다시 입력해주십시오.");
		}else if(values.deli_date1>values.deli_date2){
			Ext.Msg.alert("알림","납기일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/dahansol/sale/saleorder/get/SearchSum.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_date1		: values.invc_date1,
						invc_date2		: values.invc_date2,
						deli_date1		: values.deli_date1,
						deli_date2		: values.deli_date2,
						levl_publ_yorn	: values.levl_publ_yorn,
						line_clos		: values.line_clos,
						line_stat		: values.line_stat,
						cstm_idcd		: values.cstm_idcd,
						acpt_stat_dvcd	: values.acpt_stat_dvcd
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
						results = result;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			var editor = Ext.ComponentQuery.query('module-saleorder-search')[0],
				sum_qntt = editor.down('[name=sum_qntt]'),
				sum_amnt = editor.down('[name=sum_amnt]')
			;
			if(results.records.length){
				sum_qntt.setValue(results.records[0].sum_qntt);
				sum_amnt.setValue(results.records[0].sum_amnt);
			}
		}
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister.master(), record : record }, me);
	},


	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master = me.pocket.lister.master(),
			tindex		= tabPanel.items.indexOf(newCard),
			record		= master.getSelectionModel().getSelection(),
			file = me.pocket.file()
		;
		if (tindex == 1) {
			if (!record || record.length!=1) {
				Ext.Msg.alert("알림", "수주현황을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'saleorder2' });
			file.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			master = me.pocket.lister.master()
		;
			var err_msg = "";
			if (select){
				if (select.get("line_clos") == "1") {
					err_msg = "마감된 오더입니다.";
				}
				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

			if (select && select.length != 0) {
				Ext.each(select, function(record) {
					if (select.get("acpt_stat_dvcd") == "0600") {
						err_msg = "출고가 되있는 상태입니다.";
					}
				});

				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

		var records = master.getSelectionModel().getSelection();
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수주 1건을 선택 후 진행하십시오.");
				return;
			}

		var me = this, editor = me.pocket.editor();
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
		var me		= this,
			editor	= me.pocket.editor(),
			lister	= me.pocket.lister.master(),
			search = me.pocket.search(),
			param	= search.getValues()
		;
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'acpt_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb	: keygen.records[0].seq
						}),
						lister		: lister,
						disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback	: function (results){
							if  (results.success){
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},

	//저장
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			master = me.pocket.lister.master(),
			store	= master.getStore(),
			records	= editor.getRecord()
		;

		editor.updateRecord({
		store	: store,
		action	: Const.EDITOR.DEFAULT,
		before	: function(results, record) {

			if(film_acpt_dttm = '1') {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('amnd_degr'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'acpt_spec_dehan'
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
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
						case Const.EDITOR.PROCESS.INSERT : master.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},

	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-copy-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	// 필름수령
	FilmAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			selected = me.pocket.lister.master().getSelectionModel().getSelection(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()
			;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			for(var i=0;i <records.length;i++){
				if(records[0].get('film_acpt_yorn')!=records[i].get('film_acpt_yorn')){
					Ext.Msg.alert("알림","필름수령여부가 같은 수주목록들을 선택해주십시오.");
					checked = 1
					return;
				}
			}
		}

		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-film-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#film_numb')[0].setValue(records[0].data.film_numb);
		var numb3 = Ext.ComponentQuery.query('#film_acpt_offe')[0].setValue(records[0].data.film_acpt_offe);
		var numb4 = Ext.ComponentQuery.query('#film_acpt_yorn')[0].setValue(records[0].data.film_acpt_yorn);
		var numb5 = Ext.ComponentQuery.query('#film_name')[0].setValue(records[0].data.film_name);
	},

	// 거래명세서
	InvoiceAction:function() {
		var me = this,
			listermaster = me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			select2	= listermaster.getSelectionModel().getSelection(),
			master	= Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			record	= master.getSelectionModel().getSelection(),
			jrf		= '',
			resId	= _global.hq_id.toUpperCase(),
			param	= ''
		;

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
					return;
				}
			});
		}

		var records = master.getSelectionModel().getSelection();

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('deli_date')!=records[i].get('deli_date')){
				Ext.Msg.alert("알림","납기일자가 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","수주목록 1건이상을 선택해주십시오.");
			return;
		}

		var records = listermaster.getSelectionModel().getSelection();

		Ext.Ajax.request({
			url : _global.location.http() + '/listener/seq/maxid.do',
			object		: resource.keygen,
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: '거래명세표번호'
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				numb = result.records[0].seq;
			}
		});

		Ext.each(select2, function(record) {
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/ostt_indn_numb.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: record.get('invc_numb'),
						amnd_degr		: record.get('amnd_degr'),
						line_seqn		: record.get('line_seqn'),
						ostt_indn_numb	: numb,
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

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dahansol/sale/saleorder/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "3000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':'+ record[i].get('line_seqn')+'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'cstm_idcd\':\''+select.get('cstm_idcd')+'\',\'ostt_date\':\''+select.get('ostt_date').replace(/\-/g,'')+'\',\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	// 검사성적서발행
	InspReportAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			search = me.pocket.search(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			record = master.getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase(),
			param = search.getValues()
		;

		var records = master.getSelectionModel().getSelection();

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if (records[0].get("cstm_idcd") == null || records[0].get("cstm_idcd") == '') {
			Ext.Msg.alert("알림", "거래처가 없습니다.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dahansol/sale/saleorder/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "1000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if (jrf == null || jrf == '') {
			Ext.Msg.alert("알림", "선택한 거래처에 검사성적서양식이 없습니다.");
			return;
		}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;

	},


	// 라벨발행
	LabelAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			popup  = me.pocket.popup(),
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if(!records || records.length<1){
			Ext.Msg.alert("알림","라벨발행할 수주목록을 선택해주십시오.");
			return;
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-label-popup'
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb = Ext.ComponentQuery.query('#cstm_idcd')[0].setValue(records[0].data.cstm_idcd);
	},

	//출고지시
	ReleaseAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		select	= me.pocket.lister.master().getSelectionModel().getSelection(),
		select2	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
		record	= master.getSelectionModel().getSelection(),
		popup	= me.pocket.popup(),
		param	='',
		checked	= 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("acpt_stat_dvcd") == "0600") {
					err_msg = "출고가 되있는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('invc_date')!=records[i].get('invc_date')){
				Ext.Msg.alert("알림","수주일자가 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","출고할 수주목록을 선택해주십시오.");
			return;
		}else{
			for(var i=0;i <records.length;i++){
				if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
					Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
					checked = 1
					return;
				}
			}if(!checked){
				var a =[];

				for(var i =0; i< record.length ; i++){
					a.push({invc_numb : record[i].get('invc_numb'),line_seqn : record[i].get('line_seqn')});
				}
				param = JSON.stringify({
						cstm_idcd	: select2.data.cstm_idcd,
						ostt_date	: select2.data.invc_date.replace(/-/gi,""),
						records		: a
					});
				Ext.Msg.confirm("확인", "출고지시 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/release.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									param		: param,
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
									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
									mask.show();
									master.select({
										 callback : function(records, operation, success) {
											if (success) {
											} else {}
											mask.hide();
										}, scope : me
									});
									me.hide();
								}
								Ext.Msg.alert("알림", "출고작성이 완료 되었습니다.");
								master.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}
	},

	//출고취소
	ReleaseCancelAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		select	= me.pocket.lister.master().getSelectionModel().getSelection(),
		select2	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
		record	= master.getSelectionModel().getSelection(),
		popup	= me.pocket.popup(),
		param	='',
		checked	= 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("acpt_stat_dvcd") == "0011") {
					err_msg = " 출고가 안된상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('invc_date')!=records[i].get('invc_date')){
				Ext.Msg.alert("알림","수주일자가 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","출고취소할 수주목록을 선택해주십시오.");
			return;
		}else{
			for(var i=0;i <records.length;i++){
				if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
					Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
					checked = 1
					return;
				}
			}if(!checked){
				var a =[];

				for(var i =0; i< record.length ; i++){
					a.push({invc_numb : record[i].get('invc_numb')});
				}
				param = JSON.stringify({
						records		: a
					});
				Ext.Msg.confirm("확인", "출고취소 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/dahansol/sale/saleorder/set/releasecancel.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									param		: param,
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
									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
									mask.show();
									master.select({
										 callback : function(records, operation, success) {
											if (success) {
											} else {}
											mask.hide();
										}, scope : me
									});
									me.hide();
								}
								Ext.Msg.alert("알림", "출고취소가 완료 되었습니다.");
								master.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}
	},



	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister.master(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	// 삭제
	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore(),
			editor = me.pocket.editor(),
			select	= master.getSelectionModel().getSelection()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (select) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						record.dirtyValue('line_stat', '2');
						record.store.commitChanges();
					});
				Ext.each(select, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder2/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
								line_seqn	: record.get('line_seqn'),
								line_stat	: '2',
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								master.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
	},

	/**
	 * 대덕전자 엑셀 업로드
	 */
	excelUploadAction : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-saleorder-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/주문서 업로드 양식_대덕전자.xlsx'
			},
			apiurl : {
				upload : _global.location.href + '/system/custom/dahansol/sale/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				chk		: '1'
			},
			title			: '대덕전자  제조사양 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},

	/**
	 * TLB 엑셀 업로드
	 */
	excelUploadAction2 : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-saleorder-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/주문서 업로드 양식_TLB.xlsx'
			},

			apiurl : {
				upload : _global.location.href + '/system/custom/dahansol/sale/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				chk		: '2'
			},
			title			: 'TLB 제조사양 엑셀 Upload',					// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},

	/**
	 * 코리아써키트2공장 엑셀 업로드
	 */
	excelUploadAction4 : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-saleorder-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/주문서 업로드 양식_코리아써키트 2공장.xlsx'
			},

			apiurl : {
				upload : _global.location.href + '/system/custom/dahansol/sale/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				chk		: '4'
			},
			title			: '코리아써키트2공장 제조사양 엑셀 Upload',			// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},

	/**
	 * 코리아써키트3공장 엑셀 업로드
	 */
	excelUploadAction5 : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-saleorder-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/주문서 업로드 양식_코리아써키트 2공장.xlsx'
			},

			apiurl : {
				upload : _global.location.href + '/system/custom/dahansol/sale/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				chk		: '5'
			},
			title			: '코리아써키트3공장 제조사양 엑셀 Upload',			// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},

	/**
	 * 기타업체 엑셀 업로드
	 */
	excelUploadAction3 : function () {
		var me = this,
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-saleorder-upload2',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/주문서 업로드 양식_기타업체.xlsx'
			},

			apiurl : {
				upload : _global.location.href + '/system/custom/dahansol/sale/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				chk		: '3'
			},
			title			: '기타업체 제조사양 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},


	exportAction : function(self) {
		var me = this;
		me.pocket.lister.master().writer({enableLoadMask:true});
	},

});
