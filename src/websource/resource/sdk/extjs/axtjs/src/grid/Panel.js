Ext.define('Axt.grid.Panel', { extend:'Ext.grid.Panel',
	plugins: [],
	alias: 'widget.grid-panel',
	requires:
	[
	 	'Axt.grid.feature.Summary',
	 	'Axt.grid.plugin.Editing',
	 	'Axt.grid.plugin.TreeGrid',
	 	'Axt.grid.plugin.CellEditing',
	 	'Axt.grid.Paging',
	 	'Axt.grid.column.Lookup',
	 	'Axt.grid.column.Numeric',
	 	//header filter
		//filterbar
	 	'Axt.grid.plugin.FilterBar',
	 	'Axt.grid.plugin.GridColumnMenu',
	 	// grid column의 hide상태 저장에 관련된 클래스들
	 	'Axt.grid.plugin.GridColumnConfig'
	],
	//grid 엑셀
	//http://blogs.walkingtree.in/2013/05/06/grid-to-excel-and-excel-to-grid-copypaste-in-sencha-extjs-4-x/
	border : 0 ,
	header: false,
	multiSelect: false, // 다중 선택 여부
	columnLines: true,  // 컬럼별 라인 구분
	rowspan : false, //TODO

//	defaultConfig	: { markDirty: false , loadMask : false, enableTextSelection: true }, // config가 있을경우 합쳐야하므로 필요.
    style: 'padding-top : 1;padding-bottom : 1;padding-left : 1;padding-right : 1;',
    cls	 : 'panel-back',
	

	initComponent: function(){
		var me = this;
//		if(Ext.isArray(me.plugins)) {
//			me.plugins.push('gridcolumnmenu');
//		}
//		var config = Ext.merge(me.defaultConfig,me.viewConfig); // config 합치기

//		me.viewConfig = config;  // config 적용
		me.callParent();
		if (me.paging) {
			if (!me.paging.store){
				me.paging.store = me.getStore();
			}
			me.addDocked(me.paging, 0);
		}
		me.store.on('beforeload', function(store, operation, options){
    		if(operation.params == undefined){
    			if(store.getCount() === 0){
    				return false;
    			}
    		}
    	});

	},
	listeners:{
		destroy:function(){	// dooin 요청으로 탭삭제시 sort 초기화 20201218 장우영.
			var me = this;
			me.store.sorters.clear();
		},
	},
	/**
	 * 엑셀출력에 관련된 상수
	 */
	excelConst : {
	    FONT_WEIGHT : {
	        BOLD : 'bold',
	        NORMAL : 'normal',
	    },
	    FONT_ALIGN : {
	    	LEFT : 'left',
	    	CENTER : 'center',
	    	RIGHT : 'right'
	    },
	    COMMON_URL : '/'+_global.api_path + '/common/excel/exportExcel.do'
	},


	/**
	 * 엑셀출력에 필요한 기본 config를 리턴
	 */
	getExcelDefaultParam : function () {
		return {
			sheetName : 'sheet1',
			headerStyle: {
				backgroundColor : [213, 213, 213],
				fontSize : 11,
				fontName : '굴림',
				fontColor: [255, 255, 255], // black
				fontWeight : 'bold',     // 400 normal, 700 bold
				fontAlign : 'center'         // center

			},
			rowsStyle : {
				fontSize : 9,
				fontName : '굴림',
				fontColor: [255, 255, 255], // black
				fontWeight : 'normal',     // 400 normal, 700 bold
				fontAlign : 'left'         // left

			}
		};
	},


	/**
	 * GRID 내의 데이터를 지운다.
	 */
	eraser : function(){
		var me = this;
	    me.getStore().loadData([],false);
   	    me.getStore().clearData();
		me.summaryRefresh(); // summary부분 초기화
	},

	select : function(config, param){
		var me = this
		;
		if (param){
			Ext.merge(config, {params:{param:JSON.stringify(param)}} );
		}

		//me.queryparam = param ;
		me.getStore().queryparam = param;
		me.getStore().load( config );
		if(me.rowspan){
			setTimeout(function(){
				me.rowSpan(); //TODO 타임아웃없이는 store값이 제대로 들어올 수 없다.
			}, 100)
		}
	},
	/* Grid panel에 rowspan : true를 해줘야하며 rowspan원하는 column에도 rowspan : true를 넣어줘야한다. rowRoot는 필수로 넣어줘야한다(기준값)
	 *
	*/
	rowSpan:function(){ //TODO rowspan 기능이 없기 때문에 임시로 만듦.
		var	me = this,
			store = me.getStore(),
			header = me.columnItem().items,
			hArr = [],
			root = -1
		;
		var j = 1;
		Ext.each(header,function(record){
			if(record.rowspan || record.rowRoot){
				hArr.push(j);
			}
			if(record.rowRoot){
				root = j;
			}
			j++;
		});
		if(root < 0){
			return;
		}else{
			for (var l = 0; l < hArr.length; l++) {
				var x = 0;
				var column = me.getView().getGridColumns()[hArr[l]];
				var rootColumn = me.getView().getGridColumns()[root];
				for (var i = 0; i < store.getRange().length; i++) {
					if(store.getRange()[i].get(rootColumn.dataIndex) == store.getRange()[(i+1)<store.getRange().length?i+1:0].get(rootColumn.dataIndex)
						&& store.getRange()[i].get(column.dataIndex) == store.getRange()[(i+1)<store.getRange().length?i+1:0].get(column.dataIndex)){
						x++;
					}else if(i!= 0 && store.getRange()[i].get(column.dataIndex) == store.getRange()[i-1].get(column.dataIndex)){
						var comp = me.getView().getCell(store.getRange()[i-x],column);
						$('#'+comp.id).attr('rowspan',x+1);
						for (var k = 0; k < x; k++) {
							var comp2 = me.getView().getCell(store.getRange()[i-k],column);
							$('#'+comp2.id).attr('style', "display:none;");
						}
						x = 0;
					}
				}
			}
		}
	},

	writer : function(config) {
		var me = this,
			config = config||{} ,
			store = me.getStore(),
			param = {} // 실제 서버로 보낼 파라미터 정보
		;
			console.debug('xzxxxxxxx')
		if (store.data.length <= 0) {
			return;
		}
		param.excelParam = me.getExcelDefaultParam();             // 기본 엑셀 파라미터를 먼저 셋팅하고 아래에서 추가 셋팅함

		var arr = me.columnItem().items;

		for (var i = 0; i < arr.length; i++) {
			if(arr[i].xtype === "actioncolumn"){
				console.log(arr[i].xtype);
				arr.splice(i,1);
			}
		}

		param.excelParam.header = arr ? arr : me.columnItem();
		if( !Ext.isEmpty(config.fileName)) {
//			param.excelParam.fileName = config.fileName ;
			param.excelParam.fileName = encodeURIComponent(config.fileName) ;
		} else {
//			param.excelParam.fileName = me.title?me.title:(me.up().title?me.up().title:me.up().up().title); // 타이틀 (파일명)
			param.excelParam.fileName = encodeURIComponent(me.title?me.title:(me.up().title?me.up().title:me.up().up().title)); // 타이틀 (파일명)
			if(Ext.isEmpty(param.excelParam.fileName)) {
				Ext.Msg.alert(Const.ERROR, 'Grid의 title명을 자동으로 얻어올 수 없습니다.<br/> excelParam에 title속성을 정의해 주십시오.');
				return false;
			}
		}

		Ext.apply(param, store.queryparam || {} );

		var waitMsg = config.maskMsg||'엑셀 생성중 입니다...';
		// 서버에 이 값을 보내서 서버로부터 클라이언트로 파일이 모두 다운로드 되었는지
		// 체크를 하게 된다.
		param.downloadToken = CommonUtils.checkDownload(config.enableLoadMask, waitMsg, config.callback);
		var tempParam = param;
		var arr = new Array();
		for (var i = 0; i < param.excelParam.header.length; i++) {
			if(param.excelParam.header[i].columns){
				for (var j = 0; j < param.excelParam.header[i].columns.length; j++) {
					if(param.excelParam.header[i].columns[j].xtype=='actioncolumn'){

					}else{
						param.excelParam.header[i].columns[j].text = param.excelParam.header[i].columns[j].text.replace(/(<([^>]+)>)/ig,"");
						arr.push(param.excelParam.header[i].columns[j]);
					}
				}
			}else{
				arr.push(param.excelParam.header[i]);
			}
		}
		tempParam.excelParam.header = arr;
		//console.debug('xxxxxxx');
		var hiddenForm = Ext.create('Ext.form.Panel', {
		    url     : store.proxy.api.read ,
		    timeout : 120000,
		    height  : 0,
		    width   : 0,
		    hidden  : true,
		    items   :
		    [
		     	//{xtype:'hiddenfield', name:'excel' , value:JSON.stringify(param) },
		     	{xtype:'hiddenfield', name:'param' , value:JSON.stringify(tempParam) },
		     	{xtype:'hiddenfield', name:'token' , value:_global.token_id },
		     	{xtype:'hiddenfield', name:'page'  , value: 0 },
		     	{xtype:'hiddenfield', name:'limit' , value: 0 },
		     	{xtype:'hiddenfield', name:'start' , value: 0 },
		     	{xtype:'hiddenfield', name:'writer', value: 'excel' }
		    ]
		});
    	hiddenForm.getForm().doAction('standardsubmit',{
    	   // target : 'downloadIframe',
    	    method : 'POST',
    	    standardSubmit:true
    	});

	},

	/**
	 * 그리드의 내용을 엑셀로 출력한다.<br/>
	 * 컬럼정보는 client에서 설정된 정보로 출력하지만 row 데이터는 설정에 따라서 클라이언트의 이미 조회된 데이터로 출력할수도있고 db조회후 출력할수도 있다.<br/>
	 * 이 기능을 사용하기전 각 프로젝트의 spring servlet xml에 아래의 정보를 넣어야 한다.<br/>
	 *
	 *     // 1. 각 프로젝트의 서블릿 설정 xml에 아래의 설정을 넣는다.(예를들어 spring-system.xml)
	 *     <context:component-scan base-package="com.sky.core.common" />
	 *     <bean class="org.springframework.web.servlet.view.BeanNameViewResolver" p:order="1"/>
	 *
	 *
	 * ## 예제
	 *
	 *     // 1. 가장 기본적인 출력
	 *     // 공통 출력url을 사용하며 개발자가 별도의 url을 개발하지 않아도 된다.
	 *     // db조회를 하지 않고 현재 그리드의 조회되어있는 데이터를 기준으로 엑셀 출력을 한다.
	 *     // 그리드의 이름이 파일명이 된다.
	 *     var me = this;
	 *     var grid = me.pocket.lister();
	 *     grid.exportExcel();
	 *
	 *
	 *
	 *     // 2. 기본 출력 + 옵션
	 *     // 위의 1번과 비슷하지만 엑셀출력시 폰트, sheet명, 파일명을 변경한다.
	 *     var me = this;
	 *     var grid = me.pocket.lister();
	 *     var config = {
	 *         fileName : 'xxx',
	 *         // excel 생성에 관련된 파라미터
	 *         excelParam : {
	 *             //title : '엑셀출력파일명', // 출력될 파일명의 앞부분 (default 그리드의 이름)
	 *             sheetName : '첫장',      // excel sheet 이름 (default sheet1)
	 *             headerStyle: {                         // header의 column 스타일 정의
	 *                 backgroundColor : [213, 213, 213], // 배경색 rgb값
	 *                 fontSize : 11,                     // 폰트 크기
	 *                 fontName : '굴림',                  // 폰트명
	 *                 fontColor: [0, 0, 0],              // 폰트색
	 *                 fontWeight : grid.excelConst.FONT_WEIGHT.BOLD, // 폰트 굵기 (굵게)
	 *                 fontAlign : grid.excelConst.FONT_ALIGN.LEFT
	 *             },
	 *             rowsStyle : {                          // row의 스타일 정의
	 *                 fontSize : 9,                      // 폰트 크기
	 *                 fontName : '굴림',                  // 폰트명
	 *                 fontColor: [0, 0, 0],              // 폰트색
	 *                 fontWeight : grid.excelConst.FONT_WEIGHT.NORMAL //폰트 굵기 (일반)
	 *             }
	 *         }
	 *     }
	 *     grid.exportExcel(config);
	 *
	 *
	 *
	 *     // 3. 공통 출력url을 사용하지않고 각 화면별로 별도의 url정의
	 *     // 이경우 그리드의 row데이터는 db조회한 데이터로 대체한다.
	 *     // 서버단의 스프링 자바 컨트롤러 구현은 아래와 같이 한다
	 *     @RequestMapping(value="/basic/storeinfo/set/exportExcel.do"  )
	 *     public String exportExcel(HttpMessage http, HttpServletResponse response, Map model) throws Exception {
	 *         // 서비스에서 db조회후 map클래스에 rows란 key명으로 데이터를 넣어주면 된다.
	 *         // return되는 excelView에서 엑셀출력을 전담 한다.
     *         SqlResultMap srm = service.getSearch(http.argument, 0, 0);
     *         model.put("rows", srm);
	 *         return "excelView";
     *     }
	 *
	 *     // 클라이언트단의 스크립트는 아래와 같이 한다.
	 *     var me = this;
	 *     var grid = me.pocket.lister();   // 그리드 object
	 *     var search = me.pocket.search(); // 조회조건 fieldset object
	 *     var config = {
	 *         // excel 생성에 관련된 파라미터
	 *         fileName : 'xxx',
	 *         excelParam : {
	 *             // title : '엑셀출력파일명', // 출력될 파일명의 앞부분 (default 그리드의 이름)
	 *             sheetName : '첫장',      // excel sheet 이름 (default sheet1)
	 *             headerStyle: {                         // header의 column 스타일 정의
	 *                 backgroundColor : [213, 213, 213], // 배경색 rgb값
	 *                 fontSize : 11,                     // 폰트 크기
	 *                 fontName : '굴림',                  // 폰트명
	 *                 fontColor: [0, 0, 0],              // 폰트색
	 *                 fontWeight : grid.excelConst.FONT_WEIGHT.BOLD // 폰트 굵기 (굵게)
	 *             },
	 *             rowsStyle : {                          // row의 스타일 정의
	 *                 fontSize : 9,                      // 폰트 크기
	 *                 fontName : '궁서',                  // 폰트명
	 *                 fontColor: [0, 0, 0],              // 폰트색
	 *                 fontWeight : grid.excelConst.FONT_WEIGHT.NORMAL //폰트 굵기 (일반)
	 *             }
	 *         },
	 *
	 *         // 공통excel출력 url을 사용하지않고 개발자정의 url을 사용하고자 할때
	 *         argument
	 *         redirect : {
	 *             url : '/system/basic/storeinfo/set/exportExcel.do', // 호출할 개발자 정의 url 설정
	 *             param : search.getValues()                          // 조회조건
	 *         }
	 *     }
	 *     grid.exportExcel(config);
	 *
	 * @param config 설정정보
	 * @param {Object} config.excelParam 엑셀 출력에 대한 설정 (타이틀명, sheet이름, header, row 스타일)
	 * @param {String} config.redirect 공통 엑셀출력url을 사용하지않고 엑셀출력url을 별도로 만들려면 이 url을 설정한다.
	 */
	exportExcel : function (config) {

		var me = this,
			store = me.getStore()
		;
		if (store.data.length <= 0) {
			return;
		}

		// 설정정보 셋팅
		var config = config||{}; // 개발자가 설정한 설정정보
		var param = {};          // 실제 서버로 보낼 파라미터 정보

		if (config.apiUrl) {
			config.redirect = config.apiUrl;
		}

		// default 파라미터와 개발자가 설정한 파라미터를 결합
		me.mergeConfig(config, param);

		var waitMsg = config.maskMsg||'엑셀 생성중 입니다...';
		// 서버에 이 값을 보내서 서버로부터 클라이언트로 파일이 모두 다운로드 되었는지
		// 체크를 하게 된다.
		param.downloadToken = CommonUtils.checkDownload(config.enableLoadMask, waitMsg, config.callback);
		var hiddenForm = Ext.create('Ext.form.Panel', {
		    title:'hiddenForm',
		    standardSubmit: true,
		    url: config.redirect.url,
		    timeout: 120000,
		    height:0,
		    width: 0,
		    hidden:true,
		    items:[
		      {xtype:'hiddenfield', name:'param', value:JSON.stringify(param) },
		      {xtype:'hiddenfield', name:'token', value:_global.token_id }
		    ],
		  });

	    hiddenForm.getForm().doAction('standardsubmit',{
    	    target : 'downloadIframe', // loader.js에서 index.html의 body에 iframe을 삽입
    	    method : 'POST',
    	    standardSubmit:true
    	});
	},

	/**
	 * @private default 파라미터와 개발자가 설정한 파라미터를 결합
	 */
	mergeConfig : function (config, param, url) {
		var me = this ,
			lister = me
		;
		// grid의 header 정보 가져오기
		var header = lister.columnItem().items ? lister.columnItem().items : lister.columnItem();
		var rows = [];

		/* 사용자 정의 URL 이 있는경우라면... 서버에서 데이터를 조회하여 출력 하는 경우이기 때문에 데이터가 필요 없음 */
		if(!config.redirect) {
			// 현재grid의 store에서 rows데이터 정보 가져오기
			var store = lister.getStore();
			store.each(function(record, index, count){
				rows.push(record.data);
			}, me);
		}

		param.excelParam = me.getExcelDefaultParam();             // 기본 엑셀 파라미터를 먼저 셋팅하고 아래에서 추가 셋팅함


		if( !Ext.isEmpty(config.fileName)) {
			param.excelParam.fileName = config.fileName ;
		} else {
			param.excelParam.fileName = me.title?me.title:(me.up().title?me.up().title:me.up().up().title); // 타이틀 (파일명)
			if(Ext.isEmpty(param.excelParam.fileName)) {
				Ext.Msg.alert(Const.ERROR, 'Grid의 title명을 자동으로 얻어올 수 없습니다.<br/> excelParam에 title속성을 정의해 주십시오.');
				return false;
			}
		}
		param.excelParam.header = header;                         // header 정보
		param.excelParam.records = rows;                             // row 정보


		// 엑셀 파라미터 결합
		if(config.excelParam) {
//			if( !Ext.isEmpty(config.excelParam.fileName)) {
//				param.excelParam.fileName = config.excelParam.fileName;
//			}
			if( !Ext.isEmpty(config.excelParam.sheetName)) {
				param.excelParam.sheetName = config.excelParam.sheetName;
			}
			Ext.apply(param.excelParam.headerStyle, config.excelParam.headerStyle||{});
			Ext.apply(param.excelParam.rowsStyle, config.excelParam.rowsStyle||{});

			// 그리드의 헤더정보와 개발자의 임의의 헤더정보를 결합(있을경우만)
			if( config.excelParam.header ) {
				param.excelParam.header = config.excelParam.header;
			}

			if(config.excelParam.beforeRows) {
				param.excelParam.beforeRows = config.excelParam.beforeRows;
			}
			if(config.excelParam.afterRows) {
				param.excelParam.afterRows = config.excelParam.afterRows;
			}
		}

		// 조회조건 결합
		if(config.redirect) {
			// apiUrl속성이 있는경우 db조회후 엑셀 출력하겠다는 것이므로
			// db조회 파라미터를 기본 파라미터 객체에 결합
			if (config.redirect.param) {
				Ext.apply(param, config.redirect.param || {} );
			} else {
				Ext.apply(param, lister.getStore().queryparam  || {} );
			}

			//me.getStore().proxy.api.read ; /


		} else {
			//getStore().proxy.api.read
			config.redirect = {};
			// apiUrl이 없다는것은 db조회없이 기본 공통 엑셀출력 url을 사용하겠다는 것이다
			config.redirect.url = me.excelConst.COMMON_URL;
		}
	},

	/**
	 * 그리드 summary의 데이터를 갱신<br/>
	 *
	 * ## 예제
	 *     //summary의 데이터 수정
	 *     var grid = ......;
     *     grid.summaryRefresh({
     *         itm_nm:3001003,
     *         qty : 2500
     *     });
     *
     *     // summary초기화
     *     grid.summaryRefresh();
	 *
	 * @param {Object} summaryData summary의 데이터
	 */
	summaryRefresh : function (summaryData) {
		var me = this;
		var summaryFeature = me.getView().getFeature(0);
		if(summaryFeature) {
		    // refresh메서드는 원래 있는것이 아니고
		    // Axt.grid.feature.Summary에 정의해 놓은 것이다.
			summaryFeature.refresh(summaryData);
		}
	},

	/**
	 * 그리드 스크롤<br/>
	 *
	 * ## 예제
	 *     // left, right는 그리드의 끝까지 스크롤되며 up, down은 1row의 길이만큼 아래위로 스크롤 된다.
	 *     var grid = ....;
	 *     grid.scrolling({
	 *         direction:'right', // 방향
	 *         animate:false      // 애니메이션 효과
	 *     });
	 *
	 *     // both로 지정해놓고 x, y를 설정하면 해당 px만큼 스크롤 된다.
	 *     grid.scrolling({
	 *         direction:'both',  // 방향
	 *         animate:true,      // 애니메이션 효과
	 *         x:10, y:10         // x, y 좌표 (-도 가능)
	 *     });
	 *
	 */
	scrolling : function (config) {
		var me = this; // grid
		var direction = config.direction;
		var view      = me.getView();
		var row       = view.getNode(0);
		if(!row){
			return false;
		}
		var rowWidth  = Ext.get(row).getWidth();
		var rowHeight = Ext.get(row).getHeight();
		var animate = config.animate;

		if(!Ext.isEmpty(config.x)) {
			rowWidth = config.x;
		}
		if(!Ext.isEmpty(config.y)) {
			rowHeight= config.y;
		}
		if(direction === 'left') {
			view.scrollBy({ x: -1*rowWidth, y: 0 }, animate);
		} else if (direction === 'right') {
			view.scrollBy({ x: rowWidth, y: 0 }, animate);
		} else if (direction === 'up') {
			view.scrollBy({ x: 0, y: -1*rowHeight }, animate);
		} else if (direction === 'down') {
			view.scrollBy({ x: 0, y: rowHeight }, animate);
		} else { // both
			view.scrollBy({ x: rowWidth, y: rowHeight }, animate);
		}
	},

	/**
	 * grid header의 메뉴 추가<br/>
	 * Axt.grid.Panel을 확장(상속)하는 grid클래스에서 아래의 메서드를 override한다.<br/>
	 * this.callParent를 가장 하단으로 이동시키면 자식메뉴를 생성후<br/>
	 * 부모클래스의 initHeaderMenu를 호출한다.
	 *
	 * ## 예제
	 *     initHeaderMenu : function (ct, menu, eOpts) {
     *         this.callParent([ct, menu, eOpts]);
     *         var grid = this;
     *         menu.add([
     *             {
     *                 text : '메뉴1(메뉴안의 메뉴)',
     *                 iconCls : 'icon-pdf', // icon지정
     *                 menu : [ {
     *                     text : '메뉴1-1',
     *                     handler : function () {
     *                         Ext.Msg.alert('선택', 'You selected ' + this.text);
     *                     }
     *                 }, {
     *                     text : '메뉴1-2',
     *                     handler : function () {
     *                         Ext.Msg.alert('선택', 'You selected ' + this.text);
     *                     }
     *                 } ]
     *             },
     *             {
     *                 text : '메뉴2',
     *                 handler : function() {
     *                     var columnDataIndex = menu.activeHeader.dataIndex;
     *                     console.log(columnDataIndex);
     *                 }
     *             },
     *             {
     *                 xtype : 'menucheckitem',
     *                 text : 'grid select all', // check menu
     *                 listeners : {
     *                     checkchange : function (thisObj, checked, eOpts) {
     *                         console.log('checked', checked);
     *                         if(checked){
     *                             grid.getSelectionModel().selectAll();
     *                         } else {
     *                             grid.getSelectionModel().deselectAll();
     *                         }
     *                     }
     *                 }
     *             },
     *             {
     *                 text : '날짜 선택',
     *                 menu : {                  // date menu
     *                     xtype:'datemenu',
     *                        listeners : {
     *                        select : function (dp, sdate, edate) {
     *                            console.log(sdate)
     *                            console.log(edate)
     *                            Ext.Msg.alert('날짜 선택', 'You selected date is ' + Ext.Date.format(sdate, 'M j, Y'));
     *                        }
     *                     }
     *                 }
     *             },
     *             {
     *                 text : '색상 선택',
     *                 menu : {                  // date menu
     *                     xtype:'colormenu',
     *                     handler : function(thisObj, color, eOpts) {
     *                         Ext.Msg.alert('색상 선택', 'You selected color is ' + color);
     *                     }
     *                 }
     *             },
     *             {   xtype: 'menuseparator'   }
     *         ]); // end menu add
     *     }
	 *
	 * @param {Ext.grid.header.Container} ct Ext.grid.header.Container의 instance
	 * @param {Ext.menu.Menu} menu 생성된 그리드헤더의 메뉴
	 * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener
	 *
	 */
	initHeaderMenu : function (ct, menu, eOpts) {
		var me = this;
		var grid = this;
		var gridColumnConfigPlugin = grid.getPlugin('gridcolumnconfig');
		if(gridColumnConfigPlugin) { // 그리드 컬럼정보 저장 플러그인이 설정
			menu.add({
                text : '레이아웃',
                iconCls : Const.CONFIG.icon,
                menu : [ {
                    text : '저장',
                    iconCls : Const.UPDATE.icon, // 'icon-update',
                    handler : function () {
                    	gridColumnConfigPlugin.save();
                    }
                }, {
                    text : '초기화',
                    iconCls : Const.CANCEL.icon,
                    handler : function () {
                    	gridColumnConfigPlugin.clear();
                    }
                }]
            });
		}
//		menu.add({
//			xtype : 'menucheckitem',
//			text : '전체선택', // check menu
//			listeners : {
//				checkchange : function (thisObj, checked, eOpts) {
//					if(checked){
//				       grid.getSelectionModel().selectAll();
//					} else {
//						grid.getSelectionModel().deselectAll();
//					}
//				}
//			}
//		});
	},
	excelExport:function(){
		var	me = this
			headersCont = me.columns,					// 헤더객체
			headers     = me.columnItem().items,		// 헤더value
			ranges      = me.getStore().getRange(),		// store records
			headerArr   = new Array(),
			nameArr     = new Array(),
			jsonArr     = new Array()
		;

		for (var i = 0; i < headersCont.length; i++) {		// hidden되어있는 header을 찾아서 제외하고 배열에 저장한다.
			if(!headersCont[i].hidden){
				headerArr.push(headers[i].dataIndex);
				nameArr.push(headers[i].text);
			}
		}
		headerArr.push(' ');  // ws를 만들때 xlsx에서 잘 못만들어줘서 1개 더 추가.
		for (var i = 0; i < ranges.length; i++) {
			jsonArr.push(ranges[i].data);
		}
		var jsonSt = JSON.stringify(jsonArr);
		var json = JSON.parse(jsonSt);

		var	wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(json, {header: headerArr}),
			returnColumnCount  = headerArr.length,
			returnColnameCount = nameArr.length,
			deff               = returnColumnCount - returnColnameCount,
			dataJsonKeyLength, title
		;

		if(me.title){
			title = me.title;
		}else{
			title = '제목없음';
		}
		if(ranges[0]){
			dataJsonKeyLength = Object.keys(ranges[0].data).length;

			wb.Props = {
				Title: title,						// 엑셀 파일명
				Subject: "Excel",
				Author: "Master",
				CreatedDate: new Date()
			};
			wb.SheetNames.push(title);
			console.log(ws);

			me.delete_cols(ws, returnColnameCount + 1, dataJsonKeyLength - returnColnameCount+1 );					// 컬럼 길이를 맞춰준다.(표시되는 네임컬럼수 - json데이터 수)

			me.change_colname(ws,deff,returnColnameCount,nameArr);

			wb.Sheets[title] = ws;
			saveAs(new Blob([me.s2ab(XLSX.write(wb, {bookType: 'xlsx',type: 'binary'}))],{type:"application/octet-stream"}),me.title + '.xlsx');
		}

	},
	change_colname:function(ws,deff,name_length,nameArr){			//TODO 각 알파벳 1번자리는 컬럼 이름의 자리이다. change를 시키면 namearr에 있는 컬럼으로 교체하면된다.
		if(deff != 0){
			var charCode = 65;
			var subCharCode = 65;
			var chk = 0;
			for (var i = 0; i < name_length; i++) {
				var code ,sub;
				if(charCode > 90){
					charCode = 65;
					chk = 1;
				}
				code =  String.fromCharCode(charCode);
				if(chk==1){
					sub = String.fromCharCode(subCharCode);
					ws[code+sub+'1'].v = nameArr[i];
					if(subCharCode > 90){
						subCharCode = 65;
						charCode++;
					}else{
						subCharCode++;
					}
				}else{
					if(ws[code+'1']){
						ws[code+'1'].v = nameArr[i]?nameArr[i]:'　';
					}else{
						ws[code+'1'] = {t:'',v:''}
					}
					charCode++;
				}
			}
		}
	},
	s2ab:function(s) {														// blob형태로 변환
	    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
	    var view = new Uint8Array(buf);  //create uint8array as viewer
	    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
	    return buf;
	},
	clamp_range:function(range) {
		if(range.e.r >= (1<<20)) range.e.r = (1<<20)-1;
		if(range.e.c >= (1<<14)) range.e.c = (1<<14)-1;
		return range;
	},
	delete_cols : function (ws, start_col, ncols) {							//
		var me = this;
		if(!ws) throw new Error("operation expects a worksheet");
		var crefregex = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g;
		var dense = Array.isArray(ws);
		if(!ncols) ncols = 1;
		if(!start_col) start_col = 0;
		/* extract original range */
		var range = XLSX.utils.decode_range(ws["!ref"]);

		var R = 0, C = 0;

		var formula_cb = function($0, $1, $2, $3, $4, $5) {
			var _R = XLSX.utils.decode_row($5), _C = XLSX.utils.decode_col($3);
			if(_C >= start_col) {
				_C -= ncols;
				if(_C < start_col) return "#REF!";
			}
			return $1+($2=="$" ? $2+$3 : XLSX.utils.encode_col(_C))+($4=="$" ? $4+$5 : XLSX.utils.encode_row(_R));
		};
		var addr, naddr;
		for(C = start_col + ncols; C <= range.e.c; ++C) {
			for(R = range.s.r; R <= range.e.r; ++R) {
				addr = XLSX.utils.encode_cell({r:R, c:C});
				naddr = XLSX.utils.encode_cell({r:R, c:C - ncols});
				if(!ws[addr]) {delete ws[naddr]; continue; }
				if(ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
				ws[naddr] = ws[addr];
			}
		}

		for(C = range.e.c; C > range.e.c - ncols; --C) {
			for(R = range.s.r; R <= range.e.r; ++R) {
				addr = XLSX.utils.encode_cell({r:R, c:C});
				delete ws[addr];
			}
		}
		for(C = 0; C < start_col; ++C) {
			for(R = range.s.r; R <= range.e.r; ++R) {
				addr = XLSX.utils.encode_cell({r:R, c:C});
				if(ws[addr] && ws[addr].f) ws[addr].f = ws[addr].f.replace(crefregex, formula_cb);
			}
		}

		/* write new range */
		range.e.c -= ncols;
		if(range.e.c < range.s.c) range.e.c = range.s.c;
		ws["!ref"] = XLSX.utils.encode_range(me.clamp_range(range));

		/* merge cells */
		if(ws["!merges"]) ws["!merges"].forEach(function(merge, idx) {
			var mergerange;
			switch(typeof merge) {
				case 'string': mergerange = XLSX.utils.decode_range(merge); break;
				case 'object': mergerange = merge; break;
				default: throw new Error("Unexpected merge ref " + merge);
			}
			if(mergerange.s.c >= start_col) {
				mergerange.s.c = Math.max(mergerange.s.c - ncols, start_col);
				if(mergerange.e.c < start_col + ncols) { delete ws["!merges"][idx]; return; }
				mergerange.e.c -= ncols;
				if(mergerange.e.c < mergerange.s.c) { delete ws["!merges"][idx]; return; }
			} else if(mergerange.e.c >= start_col) mergerange.e.c = Math.max(mergerange.e.c - ncols, start_col);
			me.clamp_range(mergerange);
			ws["!merges"][idx] = mergerange;
		});
		if(ws["!merges"]) ws["!merges"] = ws["!merges"].filter(function(x) { return !!x; });

		/* cols */
		if(ws["!cols"]) ws["!cols"].splice(start_col, ncols);
	}

});

