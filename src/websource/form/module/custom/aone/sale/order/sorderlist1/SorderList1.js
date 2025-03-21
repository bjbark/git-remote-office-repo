Ext.define('module.custom.aone.sale.order.sorderlist1.SorderList1', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupAone',
		'lookup.upload.CarouselPopup',
	],
	models	: [
		'module.custom.aone.sale.order.sorderlist1.model.SorderList1Master',
		'module.custom.aone.sale.order.sorderlist1.model.SorderList1Mtrl',
		'module.custom.aone.sale.order.sorderlist1.model.SorderList1File',
	],
	stores	: [
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master1',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master2',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master3',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master4',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Detail',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1File',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1File2',
		'module.custom.aone.sale.order.sorderlist1.store.SorderList1Mtrl'
	],
	views	: [
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1Layout',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster1',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerEditor',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster2',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster3',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster4',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerDetail',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMtrl',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1Search',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1MemoPopup',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1TaxPopup',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1EditorLister',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1EditorLister2',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1Image',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1Image2',
		'module.custom.aone.sale.order.sorderlist1.view.SorderList1AmendPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sorderlist1-layout button[action=selectAction]'			: { click : me.selectAction   },	// 조회
			'module-sorderlist1-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister1 event
			'module-sorderlist1-lister-master1 button[action=exportAction]'	: { click : me.exportAction1  },	// 엑셀
			// lister2 event
			'module-sorderlist1-lister-master2 button[action=exportAction]'	: { click : me.exportAction2  },	// 엑셀
			// lister3 event
			'module-sorderlist1-lister-master3 button[action=exportAction]'	: { click : me.exportAction3  },	// 엑셀
			'module-sorderlist1-lister-detail  button[action=exportAction]'	: { click : me.exportAction31 },	// 엑셀
			// lister4 event
			'module-sorderlist1-lister-master4 button[action=exportAction]'	: { click : me.exportAction4  },	// 엑셀

			'module-sorderlist1-lister-master1' : {
				selectionchange : me.selectRecord
			},

			'module-sorderlist1-lister-master3' : {
				itemdblclick : me.selectDetail3 ,
				selectionchange : me.attachRecord
			},
			'module-sorderlist1-lister-master1 button[action=memoAction]'			: { click : me.memoAction          }, /* 반출내용 입력*/
			'module-sorderlist1-lister-master1 button[action=taxAction]'			: { click : me.taxAction           }, /* 청구내용 입력*/
			'module-sorderlist1-lister-master1 button[action=receiptAction]'		: { click : me.receiptAction       }, /* 반입/반출 */
			'module-sorderlist1-lister-master1 button[action=workPrintAction]'		: { click : me.workAction          }, /* 작업보고서 */
			'module-sorderlist1-lister-master1 button[action=amendAction]'			: { click : me.amendAction         }, /* 재수리등록 */
			'module-sorderlist1-lister-master1 button[action=deleteAction]' 		: { click : me.deleteAction        }, /* 출고취소 */

			//detail event
			'module-sorderlist1-lister-detail button[action=exportAction]' : { click : me.exportAction5 },	// 엑셀
			'module-aone-sorderlist1-editorlister'		: {
				selectionchange	: me.selectImage
			},
			'module-aone-sorderlist1-editorlister2'		: {
				selectionchange	: me.selectImage2
			}

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-sorderlist1-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-sorderlist1-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-master1')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-editor')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-aone-sorderlist1-editorlister')[0] },
		editorlister2: function () { return Ext.ComponentQuery.query('module-aone-sorderlist1-editorlister2')[0] },
		image		: function () { return Ext.ComponentQuery.query('module-aone-sorderlist1-image')[0] },
		image2		: function () { return Ext.ComponentQuery.query('module-aone-sorderlist1-image2')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-master2')[0] },
		master3		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-master3')[0] },
		master4		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-master4')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-detail')[0] },
		mtrl		: function () { return Ext.ComponentQuery.query('module-sorderlist1-lister-mtrl')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			master1 = me.pocket.master1(),
			editor  = me.pocket.editor(),
			master2 = me.pocket.master2(),
			master3 = me.pocket.master3(),
			master4 = me.pocket.master4(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;

		if (param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if ( tindex == 0 ) {
			lister = master1;
		}else if(tindex == 1){
			lister = master2;
		}else if(tindex == 2){
			lister = master3;
		}else if(tindex == 3){
			lister = master4;
		}

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id,mes_system_type:_global.options.mes_system_type}) );
	},

	attachRecord:function( smodel, record ){
		var me	= this
			master3= smodel ? smodel.view.ownerCt : me.pocket.master3(),
					record= record ? record[0] : master3.getSelectionModel().getSelection()[0]
		;
		me.pocket.detail().eraser() ;
		if (record) {
		}
	},

	//조회시 작동할 기능
	selectRecord:function( grid, record ){
		var me = this,
			master		= me.pocket.master1(),
			editor		= me.pocket.editor(),
			param		= me.pocket.search().getValues(),
			select		= me.pocket.master1().getSelectionModel().getSelection(),
			mtrl		= me.pocket.mtrl(),
			editorlister= me.pocket.editorlister(),
			editorlister2= me.pocket.editorlister2()
		;

		if(record.length > 0 && record[0].get('invc_numb')){
			editor.selectRecord({ lister : me.pocket.master1() , record : record }, me);

			mtrl.eraser();
			if(record[0].get('work_invc_numb')){
				mtrl.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { work_invc_numb:record[0].get('work_invc_numb') });
			}
			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				invc_numb: select[0].get('invc_numb'),
				orgn_dvcd: 'acpt_mast',
				line_seqn: 0,
				uper_seqn: select[0].get('amnd_degr'),
				file_dvcd_1fst: "3100",
			}));
			editorlister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				invc_numb: select[0].get('invc_numb'),
				orgn_dvcd: 'acpt_mast',
				line_seqn: 0,
				uper_seqn: select[0].get('amnd_degr'),
				file_dvcd_1fst: "3200",
			}));
		}
	},

	selectDetail3 : function(grid, record) {
		var me = this,
			search = me.pocket.search(),
			param  = search.getValues(),
			detail = me.pocket.detail(),
			invc1_date, invc2_date, cstm_idcd, drtr_idcd;

		if (param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
		}

		invc1_date = param.invc1_date;
		invc2_date = param.invc2_date;
		cstm_idcd  = param.cstm_idcd;
		prod_drtr_idcd  = param.prod_drtr_idcd;

		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { item_idcd : record.get('item_idcd'), invc1_date : invc1_date, invc2_date : invc2_date, cstm_idcd : cstm_idcd, drtr_idcd : drtr_idcd });
		}
	},
	//반출내용 입력
	memoAction:function() {
		var me      = this,
			lister  = me.pocket.master1(),
			select  = lister.getSelectionModel().getSelection()
		;
		if (select) {
			var cstm = "";
			var err_msg = "";
			var i = 0;
			var records = [];
			Ext.each(select,function(rec){
				if(i==0){
					cstm = rec.get('cstm_idcd');
				}else{
					if(cstm!=rec.get('cstm_idcd')){
						err_msg = "다른 거래처가 포함되어 있습니다. 같은 거래처만 다중등록 가능합니다.";
					}
				}
				records.push(rec.data);
				i++;
			})
			if(err_msg!=""){
				Ext.Msg.alert('알림',err_msg);
				return;
			}
			resource.loadPopup({
				widget : 'module-sorderlist1-memo-popup',
					param : {
						records:records
					},
			});
		}
	},

	//청구내용 입력
	taxAction:function() {
		var me      = this,
			lister  = me.pocket.master1(),
			select  = lister.getSelectionModel().getSelection()[0],
			record = lister.getSelectionModel().getSelection()[0]
		;
		var records = lister.getSelectionModel().getSelection();

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				resource.loadPopup({
					widget : 'module-sorderlist1-tax-popup',
						param : {
							invc_numb  : records[0].get('invc_numb'),
							amnd_degr  : records[0].get('amnd_degr'),
							bill_publ_yorn : records[0].get('bill_publ_yorn'),
							bill_date  : records[0].get('bill_date'),
							bill_amnt  : records[0].get('bill_amnt')
						},
					});
				})
		}
	},


	// 반입/반출 발행
	receiptAction:function() {
		var me = this,
			master = me.pocket.master1(),
			record = master.getSelectionModel().getSelection(),
			jrf    = 'A-one_receipt.jrf',
			resId  = _global.hq_id.toUpperCase()
		;
		var err_msg = "";

		var records = master.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
			a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'amnd_degr\':\''+record[i].get('amnd_degr')+'\'}';

			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win   =  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 작업보고서 발행
	workAction:function() {
		var me = this,
			master  = me.pocket.master1(),
			select  = master.getSelectionModel().getSelection(),
			jrf = 'A-one_Sorderostt.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		if(select.length == 1) {
			var invc_numb = select[0].get('invc_numb');
			var amnd_degr = select[0].get('amnd_degr');
			var arg =	'invc_numb~'+invc_numb+'~'+'amnd_degr~'+amnd_degr+'~'+'path~'+_global.img_http+'~';

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
		} else {
			Ext.Msg.alert("알림", "작업보고서 출력하시려는 1건을 선택 후 진행하십시오.");
		}
	},
	// 재수리 등록
	amendAction:function() {
		var me = this,
			master = me.pocket.master1(),
			select = master.getSelectionModel().getSelection()
		;
		if (select && select.length == 1) {
			resource.loadPopup({
				widget : 'module-sorderlist1-amend-popup',
				param : {
					invc_numb  : select[0].get('invc_numb'),
					amnd_degr  : select[0].get('amnd_degr')
				},
			});
		}else{
			Ext.Msg.alert("알림", "재수리 등록할 1건을 선택 후 진행하십시오.");
		}
	},

	deleteAction:function() {
		var me	= this,
			master	= me.pocket.master1(),
			select	= master.getSelectionModel().getSelection(),
			err_msg = "",
			// invc_numb = "";
			max_amnd_degr,
			amnd_degr = select[0].get('amnd_degr')
		;
		
		if (select) {
			var records =[];
			Ext.each(select,function(rec){				
				
			/*	if(rec.get("acpt_dvcd") == '1100') {
					invc_numb = rec.get("prnt_idcd")	
				} else {
					invc_numb = rec.get("invc_numb")
				}*/
				
				if(rec.get("acpt_stat_dvcd") != "6000"){
					err_msg = "출고완료된 입고리스트만 취소가능합니다.";
				}else{
					records.push({
						invc_numb : rec.get('invc_numb'),
						amnd_degr : rec.get('amnd_degr'),
						ostt_qntt : rec.get('invc_qntt'),
						line_seqn : rec.get('line_seqn'),
						prnt_idcd : rec.get('prnt_idcd'),
						ostt_drtr_idcd	: _global.login_id
					});
				}
			})
			if(err_msg!=""){
				Ext.Msg.alert('알림',err_msg);
			}
			
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/orderInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param : JSON.stringify({
						records	: records
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						max_amnd_degr = result.records.max_amnd_degr;						
					}						
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			
			if(max_amnd_degr > amnd_degr ) {
				Ext.Msg.alert('알림',"최종 차수가 아닌 수리품은 출고취소를 할 수 없습니다.");
			} else {
				Ext.Msg.confirm("확인", "출고취소 등록 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/aone/sale/order/sordermast/set/releasecancel.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param : JSON.stringify({
									records	: records
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
								} else {
									Ext.Msg.alert("알림", "출고 취소가 완료 되었습니다.");
									master.getStore().reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				});
			}		
		}
	},
	selectImage : function(grid, record){
		var me = this,
			image = me.pocket.image()
		;
		image.down('[name=list1_imge_1fst]').setSrc('');
		var reg = new RegExp('\.(jpeg|jpg|gif|png)', 'i')
		if(record.length > 0 && record[0].get('file_name').search(reg)){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: record[0].get('invc_numb'),
						line_seqn		: record[0].get('line_seqn'),
						assi_seqn		: record[0].get('assi_seqn'),
						uper_seqn		: record[0].get('uper_seqn'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						if(result){
							var file_name = result.records[0].file_name;
							if(file_name != undefined){
								var url = _global.img_http+'/'+file_name;
								image.down('[name=list1_imge_1fst]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
								image.down('[name=list1_imge_1fst]').setSrc(url);
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	selectImage2 : function(grid, record){
		var me = this,
			image = me.pocket.image2()
		;
		image.down('[name=list1_imge_2]').setSrc('');
		var reg = new RegExp('\.(jpeg|jpg|gif|png)', 'i')
		if(record.length > 0 && record[0].get('file_name').search(reg)){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: record[0].get('invc_numb'),
						line_seqn		: record[0].get('line_seqn'),
						assi_seqn		: record[0].get('assi_seqn'),
						uper_seqn		: record[0].get('uper_seqn'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						if(result){
							var file_name = result.records[0].file_name;
							if(file_name != undefined){
								var url = _global.img_http+'/'+file_name;
								image.down('[name=list1_imge_2]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
								image.down('[name=list1_imge_2]').setSrc(url);
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	// 엑셀
	exportAction1  : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2  : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3  : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction31 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	},
	exportAction4  : function() {
		this.pocket.master4().writer({enableLoadMask:true});
	},
});