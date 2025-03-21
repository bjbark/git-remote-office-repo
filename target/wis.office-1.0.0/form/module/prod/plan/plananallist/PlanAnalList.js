Ext.define('module.prod.plan.plananallist.PlanAnalList', { extend : 'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.base.BasePopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.CvicPopup'
	],
	models	: [

		'module.prod.plan.plananallist.model.PlanAnalList1',
		'module.prod.plan.plananallist.model.PlanAnalList2'
	],
	stores	: [
		'module.prod.plan.plananallist.store.PlanAnalList1',
		'module.prod.plan.plananallist.store.PlanAnalList2'
	],
	views	: [
		'module.prod.plan.plananallist.view.PlanAnalListLayout',
		'module.prod.plan.plananallist.view.PlanAnalListLister1',
		'module.prod.plan.plananallist.view.PlanAnalListLister2',
		'module.prod.plan.plananallist.view.PlanAnalListSearch'
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			'module-plananallist-layout #itempanel'							: { tabchange : me.itemTabChange },
			'module-plananallist-layout button[action=selectAction]'		: { click : me.selectAction },		/* 조회 */
			'module-plananallist-lister1 button[action=changeAction]'		: { click : me.changeAction },		/* 일정보기 */
			'module-plananallist-lister1 button[action=insertAction]'		: { click : me.insertAction },		/* 등록 */
			'module-plananallist-lister1 button[action=onePlanAction]'		: { click : me.onePlanAction },		/* 건별지시 */
			'module-plananallist-lister1 button[action=exportAction]'		: { click : me.exportAction },		/* 엑셀 */
			'module-plananallist-lister1 button[action=cancelOrderAction]'	: { click : me.cancelOrderAction },	/* 주문취소 */
			'module-plananallist-lister2 button[action=exportAction]'		: { click : me.exportAction2 },		/* 엑셀 */
		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-plananallist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-plananallist-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-plananallist-lister1')[0]},
		lister2	: function () { return Ext.ComponentQuery.query('module-plananallist-lister2')[0]}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;

		if(param.fr_dt>param.to_dt){
			Ext.Msg.alert("알림", "일자를 다시 입력해주십시오.")
			return;
		}else if((param.fr_dt == '' || param.fr_dt == null) && (param.to_dt == '' || param.to_dt == null)){
			Ext.Msg.alert("알림", "일자를 입력해주십시오.")
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select;
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	cancelOrderAction:function() {
		var me = this,
			lister1  = me.pocket.lister1(),
			select = lister1.getSelectionModel().getSelection()
		;
		if (!select || select.length != 1 ){
			Ext.Msg.error('취소 하시려는 1건을 선택 후 진행하십시오!');
			return;
		}

		var record = select[0];
		if (!(record.get('sts_cd') == '0190' || record.get('sts_cd') == '0100')) {
			Ext.Msg.error('입금대기/배송대기 상태만 취소 가능 합니다.');
			return;
		}

		if ( record.get('row_clos') == '1' ) {
			Ext.Msg.show({ title: '알림', msg: '마감된 내역은 취소 하실수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		Ext.Msg.confirm('확인','주문 취소 하시겠습니까?',  function(button) {
			if (button === 'yes'){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url: _global.api_host_info + '/' + _global.app_site + '/sale/plananallist/set/cancel.do' ,
					method:"POST",
					params: {
					 	token : _global.token_id ,
						param : Ext.encode({
							inv_no    : record.get('inv_no' ),
							upt_id : _global.login_pk
						})
					},
					success: function (response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success){
							record.set('sts_cd' , '0040');
							master.getStore().commitChanges();
						}else{
							Ext.Msg.show({ msg: result.message,  buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
						}
					},
					failure: function (response, request) {
						resource.httpError(response);
					},
					callback : function ( sdddd) {
						mask.hide();
					}

				});
			}
		});
	},

	onePlanAction:function() {
		var me  = this,
			lister = me.pocket.lister1() ,
			select = lister.getSelectionModel().getSelection(),
			a = new Array()
			b = new Array()
		;
		var record = select[0];

		for(var i=0;i <select.length;i++){
			a.push(select[i].data.invc_numb);
			b.push(select[i].data.line_seqn);
		}
		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-plananallist-write-popup',
				params : {	invc_numb : a,
							line_seqn : b},
				result : function(result) {
					if (result.success) {
						record.dirtyValue( 'invc_numb' , record.get('invc_numb') );
					}
				}
			})
		}
	},

	changeAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var search_url	= '/system/ganttchart/getGanttProjectWork.do';
		var update_url	= '/system/ganttchart/setGanttProjectWork.do';
		var invc_numb	= 'test project';
		var schd_dvcd	= '1000'; /* 개략설계  */

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '작업일정 관리',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\'}" width="100%" height="100%">iframe</iframe>',
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
	},

	exportAction : function(self){
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});