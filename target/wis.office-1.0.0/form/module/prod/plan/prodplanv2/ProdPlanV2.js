Ext.define('module.prod.plan.prodplanv2.ProdPlanV2', { extend : 'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.BasePopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkfwPopup'
	],
	models	: [
		'module.prod.plan.prodplanv2.model.ProdPlanV21',
		'module.prod.plan.prodplanv2.model.ProdPlanV22',
		'module.prod.plan.prodplanv2.model.ProdPlanV2Entry',
	],
	stores	: [
		'module.prod.plan.prodplanv2.store.ProdPlanV21',
		'module.prod.plan.prodplanv2.store.ProdPlanV22',
		'module.prod.plan.prodplanv2.store.ProdPlanV2Entry',
		'module.prod.plan.prodplanv2.store.ProdPlanV2Write'
	],
	views	: [
		'module.prod.plan.prodplanv2.view.ProdPlanV2Layout',
		'module.prod.plan.prodplanv2.view.ProdPlanV2Lister1',
		'module.prod.plan.prodplanv2.view.ProdPlanV2Lister2',
		'module.prod.plan.prodplanv2.view.ProdPlanV2Search',
		'module.prod.plan.prodplanv2.view.ProdPlanV2Cancel',
		'module.prod.plan.prodplanv2.view.ProdPlanV2WritePopup'
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			'module-prodplanv2-layout #mainpanel'						: { tabchange : me.selectAction  },
			'module-prodplanv2-layout button[action=selectAction]'		: { click : me.selectAction },		/* 조회 */
			'module-prodplanv2-lister1 button[action=ganttAction]'		: { click : me.ganttAction },		/* 일정보기 */
			'module-prodplanv2-lister1 button[action=insertAction]'		: { click : me.insertAction },		/* 등록 */
			'module-prodplanv2-lister1 button[action=onePlanAction]'	: { click : me.onePlanAction },		/* 건별지시 */
			'module-prodplanv2-lister1 button[action=exportAction]'		: { click : me.exportAction },		/* 엑셀 */
			'module-prodplanv2-lister1 button[action=cancelOrderAction]': { click : me.cancelOrderAction },	/* 주문취소 */
			'module-prodplanv2-lister2 button[action=exportAction]'		: { click : me.exportAction2 },		/* 엑셀 */
			'module-prodplanv2-lister2 button[action=workAction]'		: { click : me.workAction },		/* 작업지시 */
		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-prodplanv2-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-prodplanv2-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-prodplanv2-lister1')[0]},
		lister2	: function () { return Ext.ComponentQuery.query('module-prodplanv2-lister2')[0]},
		change	: function () { return Ext.ComponentQuery.query('module-prodplanv2-change-popup')[0] },
		write		: function () { return Ext.ComponentQuery.query('module-prodplanv2-write-popup')[0]}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(tindex==0){
			lister = lister1
		}else{
			lister = lister2
		}

		if(param.fr_dt>param.to_dt){
			Ext.Msg.alert("알림", "일자를 다시 입력해주십시오.")
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	onePlanAction:function() {
		var me  = this,
			lister = me.pocket.lister1() ,
			select = lister.getSelectionModel().getSelection(),
			a = new Array()
			b = new Array(),
			c = new Array()
		;
		var max = '';
		var record = select[0];
		for(var i=0;i <select.length;i++){

			a.push(select[i].data.invc_numb);
			b.push(select[i].data.line_seqn);
			c.push(select[i].data.item_idcd);
		}
//		if(select.length == 0){
//			Ext.Msg.alert("알림","생산계획 할 항목을 선택해주십시오.");
//		}else{
		if(typeof record != "undefined") {
			for(var i=0;i <select.length;i++){
				if(select[0].get('item_idcd')!=select[i].get('item_idcd')){
					Ext.Msg.alert("알림", "동일품목의 항목을 선택해주십시오.");
					return;
				}
			}

			resource.loadPopup({
				widget : 'module-prodplanv2-write-popup',
				params : {
					invc_numb : a,
					line_seqn : b,
					item_idcd : c,
				},
				result : function(result) {
					if (result.success) {
						record.dirtyValue( 'invc_numb' , record.get('invc_numb') );
					}
				}
			})
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/plan/prodplanv2/get/max.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: _global.invc_numb
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message);
						return;
					} else {
						max = result.records[0].max;
						var popup = Ext.ComponentQuery.query('module-prodplanv2-write-popup')[0];
						if(max==undefined){
							max = Ext.util.Format.date(new Date(),'ymd')+'-'+1;
							popup.down('form').down('[name=max]').setValue(max);
						}else{
							popup.down('form').down('[name=max]').setValue(max);
						}

					}
				},failure : function(result, request) {
				},callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
			});
		}else{
			Ext.Msg.alert("알림","수주 리스트에서 수주를 선택하여 주십시오.");
		}
	},

	ganttAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.fr_dt == '' || param.to_dt == ''){
			Ext.Msg.alert('알림','기간을 선택해주세요.')
		}else{
			var hq_id		= _global.hq_id.toUpperCase();
				chk			= Ext.dom.Query.select('.x-css-shadow'),
				a			= _global.api_host_info,
				search_url	= '/system/ganttchart/gantt_query_1.do',
				update_url	= '',
				title		= '생산계획',
				source		= '생산계획',
				levels		= '2',
				to_dt		= param.to_dt,
				fr_dt		= param.fr_dt,
				url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',title:\''+title+'\',source:\''+source+'\',levels:\''+levels+'\',hq_id:\''+hq_id+'\',to_dt:\''+to_dt+'\',fr_dt:\''+fr_dt+'\'}'
			;
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '생산계획 관리',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%">iframe</iframe>',
						listeners : {
							show : function (win) {
								win.maximize ();
							},
							minimize: function(data) {
								win.setVisible(false);
								var a;
								var button = Ext.create('Ext.Button', {
									text: data.title,
									style: 'z-index: 9999!important',
									draggable :true,
									renderTo: Ext.getBody(),
									listeners : {
										move : function (e) {// dropped
											a = 1;
										},
										click : function(e) {
											if(a==1){
												x = button.getX();
												y = button.getY();
												temp = 1;
												a = 0;
												return;
											}else{
												win.setVisible(true);
												this.destroy();
											}
										}
									}
								});
								if(temp == 0){
									button.setX(200);
									button.setY(850);
								}else{
									button.setX(x);
									button.setY(y);
								}
							}
						}
				}); win.show();
			}
		}
	},
	//작업지시
	workAction:function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			select  = lister2.getSelectionModel().getSelection()[0],
			store   = lister2.getStore()
		;
		if(!select) {
			Ext.Msg.alert("알림", "생산계획을 선택해주세요.");
		}else{
			if(select.get('prod_trst_numb')!= '' || select.get('prod_trst_numb')!= null){
				var	form = Ext.widget('form', {
					border: false,
					bodyPadding: 10,
					fieldDefaults: {
						labelWidth: 60,
						labelStyle: 'text-align:right',
						width		: 280,
						labelSeparator : '',
					},
					items:[
						{	xtype		: 'label',
							text		: '작업지시서를 작성하시겠습니까 ?',
							height		: 30,
						}
					],
					buttons: [
						{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
							cls: 'button-style',
							handler: function() {
								var me = this;
								Ext.Ajax.request({
									url		: _global.location.http() + '/prod/plan/prodplanv2/set/work_order_create.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											invc_numb		: select.get('invc_numb'),
											prod_line_idcd	: select.get('prod_line_idcd'),
											plan_sttm		: select.get('plan_sttm').replace(/\-/g,'').substr(0,8),
//											plan_edtm		: select.get('plan_edtm').replace(/\-/g,'').substr(0,8),
											trst_qntt		: select.get('trst_qntt'),
											line_seqn		: 1
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
											me.up('window').hide();
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}
						},
						{	text: '<span class="btnTemp" style="font-size:1em">아니오</span>',
							cls: 'button-style',
							handler: function() {
								this.up('form').getForm().reset();
								this.up('window').hide();
							}
						}
					],

				});

				win = Ext.widget('window', {
					title: '작업지시',
					closeAction: 'hide',
					width: 320,
					height: 100,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form,
					defaultFocus: 'pjod_idcd'
				});
				win.show();
			}else{
			Ext.Msg.alert("알림", "이미 작업지시된 생산계획입니다..");
			}
		}
	},
	exportAction : function(self){
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});