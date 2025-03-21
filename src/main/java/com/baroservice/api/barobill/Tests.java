package com.baroservice.api.barobill;

import java.rmi.RemoteException;

import com.baroservice.api.BarobillApiProfile;
import com.baroservice.api.BarobillApiService;
import com.baroservice.ws.Contact;
import com.sky.http.HttpRequestArgument;

/**
 * <h1>바로빌 기본 API</h1>
 * <p>
 * 바로빌 기본 API 는 BarobillApiService 클래스 안의(taxInvoice, edoc, cashbill 등 ..) 모든 API에 포함되어 있습니다.
 */
public class Tests {

    /**
     * 바로빌 API 정의 클래스
     * <p>
     * 환경에 따라 BarobillApiProfile 를 지정해주세요.
     */
    private BarobillApiService barobillApiService;

    public Tests() {
        barobillApiService = new BarobillApiService(BarobillApiProfile.TESTBED);
    }

    /**
     * CheckCorpIsMember - 회원사 여부 확인
     * @throws Exception
     */

    public int CheckCorpIsMember(HttpRequestArgument arg, String key) throws Exception {

        String certKey = key;            //인증키
        String corpNum = arg.fixParamText("buss_numb").replaceAll("-","");            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String checkCorpNum = arg.fixParamText("buss_numb").replaceAll("-","");        //확인할 사업자번호 ('-' 제외, 10자리)

        int result = barobillApiService.taxInvoice.checkCorpIsMember(certKey, corpNum, checkCorpNum);

        System.out.println(result);
        return result;
    }

    /**
     * RegistCorp - 회원사 추가
     * @throws Exception
     */

    public int RegistCorp(HttpRequestArgument arg, String key) throws Exception {

        String certKey = key;            //인증키
        String corpNum = arg.fixParamText("buss_numb").replaceAll("-","");            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String corpName = arg.fixParamText("buss_name");            //회사명
        String ceoName = arg.fixParamText("boss_name");            //대표자명
        String bizType = arg.fixParamText("buss_type");            //업태
        String bizClass = arg.fixParamText("buss_kind");            //업종
        String postNum = "";            //우편번호
        String addr1 = arg.fixParamText("addr_1fst");                //주소1 (ex. 서울특별시 양천구 목1동)
        String addr2 = arg.fixParamText("addr_2snd");                //주소2 (ex. SBS방송센터 920)
        String memberName = arg.fixParamText("login_nm");            //담당자 성명
        String juminNum = "";            //주민등록번호 ('-' 제외, 13자리)
        String id = arg.fixParamText("lgin_idcd");                    //연계사업자 아이디
        String pwd = arg.fixParamText("lgin_pswd");                //연계사업자 비밀번호 (6~20자만 가능)
        String grade = "";                //직급
        String tel = arg.fixParamText("tele_numb");                //전화번호
        String hp = "";                    //휴대폰
        String email = arg.fixParamText("mail_addr");                //이메일

        int result = barobillApiService.taxInvoice.registCorp(certKey, corpNum, corpName, ceoName, bizType, bizClass, postNum, addr1, addr2, memberName, juminNum, id, pwd, grade, tel, hp, email);

        System.out.println(result);
        return result;
    }

    /**
     * UpdateCorpInfo - 회원사 정보 수정
     */

    public void UpdateCorpInfo() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String corpName = "";            //회사명
        String ceoName = "";            //대표자명
        String bizType = "";            //업태
        String bizClass = "";            //업종
        String postNum = "";            //우편번호
        String addr1 = "";                //주소1 (ex. 서울특별시 양천구 목1동)
        String addr2 = "";                //주소2 (ex. SBS방송센터 920)

        int result = barobillApiService.taxInvoice.updateCorpInfo(certKey, corpNum, corpName, ceoName, bizType, bizClass, postNum, addr1, addr2);

        System.out.println(result);
    }

    /**
     * GetCorpMemberContacts - 회원사 담당자 목록
     */

    public void GetCorpMemberContacts() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String checkCorpNum = "";        //확인할 사업자번호 ('-' 제외, 10자리)

        Contact[] result = barobillApiService.taxInvoice.getCorpMemberContacts(certKey, corpNum, checkCorpNum);

        System.out.println(result);
    }

    /**
     * ChangeCorpManager - 회원사 관리자 변경
     */

    public void ChangeCorpManager() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String newManagerId = "";        //연계사업자 새 관리자 아이디

        int result = barobillApiService.taxInvoice.changeCorpManager(certKey, corpNum, newManagerId);

        System.out.println(result);
    }

    /**
     * AddUserToCorp - 사용자 추가
     * @throws Exception
     */

    public int AddUserToCorp(HttpRequestArgument arg, String key) throws Exception {
        String certKey =  key;                //인증키
        String corpNum =  arg.fixParamText("buss_numb").replaceAll("-","");                //연계사업자 사업자번호 ('-' 제외, 10자리)
        String memberName = arg.fixParamText("login_nm");                //담당자 성명
        String juminNum = "";                //주민등록번호 ('-' 제외, 13자리)
        String id = arg.fixParamText("lgin_idcd");                        //연계사업자 아이디
        String pwd = arg.fixParamText("lgin_pswd");                    //연계사업자 비밀번호 (6~20자만 가능)
        String grade = "";                    //직급
        String tel = arg.fixParamText("tele_numb");                    //전화번호
        String hp = arg.fixParamText("tele_numb");                        //휴대폰
        String email = arg.fixParamText("mail_addr");                    //이메일

        int result = barobillApiService.taxInvoice.addUserToCorp(certKey, corpNum,memberName, juminNum, id, pwd,  grade, tel, hp, email);

        System.out.println(result);
        return result;
    }

    /**
     * UpdateUserInfo - 사용자 정보 수정
     */

    public void UpdateUserInfo() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String id = "";                    //연계사업자 아이디
        String memberName = "";            //담당자 성명
        String juminNum = "";            //주민등록번호 ('-' 제외, 13자리)
        String grade = "";                //직급
        String tel = "";                //전화번호
        String hp = "";                    //휴대폰
        String email = "";                //이메일

        int result = barobillApiService.taxInvoice.updateUserInfo(certKey, corpNum, id, memberName, juminNum, grade, tel, hp, email);

        System.out.println(result);
    }

    /**
     * UpdateUserPWD - 사용자 비밀번호 수정
     */

    public void UpdateUserPWD() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String id = "";                    //연계사업자 아이디
        String newPwd = "";                //새 비밀번호

        int result = barobillApiService.taxInvoice.updateUserPWD(certKey, corpNum, id, newPwd);

        System.out.println(result);
    }

    /**
     * GetBalanceCostAmount - 잔여포인트 확인
     */

    public void GetBalanceCostAmount() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)

        long result = barobillApiService.taxInvoice.getBalanceCostAmount(certKey, corpNum);

        System.out.println(result);
    }

    /**
     * GetBalanceCostAmountOfInterOP - 연동사포인트 확인
     */

    public void GetBalanceCostAmountOfInterOP() throws RemoteException {

        String certKey = "";            //인증키

        long result = barobillApiService.taxInvoice.getBalanceCostAmountOfInterOP(certKey);

        System.out.println(result);
    }

    /**
     * GetChargeUnitCost - 요금 단가 확인
     */

    public void GetChargeUnitCost() throws RemoteException {

        String certKey = "";    //인증키
        String corpNum = "";    //연계사업자 사업자번호 ('-' 제외, 10자리)
        int chargeCode = 11;    //1:세금계산서 2:계산서 3:거래명세서 4:입금표 5:청구서 6:견적서 7:영수증 8:발주서 9:현금영수증 11:SMS전송 12:FAX전송 13:LMS전송 14:MMS전송

        int result = barobillApiService.taxInvoice.getChargeUnitCost(certKey, corpNum, chargeCode);

        System.out.println(result);
    }

    /**
     * CheckChargeable - 과금 가능여부 확인
     */

    public void CheckChargeable() throws RemoteException {

        String certKey = "";        //인증키
        String corpNum = "";        //연계사업자 사업자번호 ('-' 제외, 10자리)
        int cType = 5;                //1:문서발행 2:발행+SMS전송 5:SMS전송 6:FAX전송 7:LMS전송 8:MMS전송
        int docType = 1;            //CType이 1,2 인 경우 = 1:세금계산서 2:계산서 3:거래명세서 4:입금표 5:청구서 6:견적서 7:영수증 8:발주서 9:현금영수증
        //CType이 5,6,7,8 인 경우 = 1

        int result = barobillApiService.taxInvoice.checkChargeable(certKey, corpNum, cType, docType);

        System.out.println(result);
    }

    /**
     * GetCertificateRegistURL - 공인인증서 등록 URL
     */

    public void GetCertificateRegistURL() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String id = "";                    //연계사업자 아이디
        String pwd = "";                //연계사업자 비밀번호

        String result = barobillApiService.taxInvoice.getCertificateRegistURL(certKey, corpNum, id, pwd);

        System.out.println(result);
    }

    /**
     * GetCertificateExpireDate - 등록한 공인인증서 만료일 확인
     */

    public void GetCertificateExpireDate() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)

        String result = barobillApiService.taxInvoice.getCertificateExpireDate(certKey, corpNum);

        System.out.println(result);
    }

    /**
     * RegistSMSFromNumber - 발신번호 추가
     */

    public void RegistSMSFromNumber() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String fromNumber = "";            //문자 발신번호

        int result = barobillApiService.taxInvoice.registSMSFromNumber(certKey, corpNum, fromNumber);

        System.out.println(result);
    }

    /**
     * CheckSMSFromNumber - 발신번호 확인
     */

    public void CheckSMSFromNumber() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String fromNumber = "";            //문자 발신번호

        int result = barobillApiService.taxInvoice.checkSMSFromNumber(certKey, corpNum, fromNumber);

        System.out.println(result);
    }

    /**
     * GetSMSFromNumberURL - 발신번호 관리 URL
     */

    public void GetSMSFromNumberURL() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String id = "";                    //연계사업자 아이디
        String pwd = "";                //연계사업자 비밀번호

        String result = barobillApiService.taxInvoice.getSMSFromNumberURL(certKey, corpNum, id, pwd);

        System.out.println(result);
    }

    /**
     * GetBaroBillURL - 바로빌 URL
     * @throws Exception
     */

    public String GetBaroBillURL(HttpRequestArgument arg,String key) throws Exception {

    	String certKey = key;               //인증키
    	String corpNum = arg.fixParamText("buss_numb").replaceAll("-","");             //연계사업자 사업자번호 ('-' 제외, 10자리)
    	String id = arg.fixParamText("lgin_idcd");                  //연계사업자 아이디
    	String pwd = arg.fixParamText("lgin_pswd");                 //연계사업자 비밀번호
    	String togo = arg.fixParamText("togo");                     //URL 코드

    	String result = barobillApiService.taxInvoice.getBaroBillURL(certKey, corpNum, id, pwd, togo);

    	System.out.println(result);
    	return result;
    }
    public String GetError(String errorCode) throws Exception {
    	String msg = "";
    	switch (errorCode) {
	    	case "-10002":
	    		msg = "해당 인증키를 찾을 수 없습니다.";
	    		break;
	    	case "-10001":
	    		msg = "해당 인증키와 연결된 연계사가 아닙니다.";
	    		break;
	    	case "-24005":
	    		msg = "사업자번호와 아이디가 맞지 않습니다.";
	    		break;
	    	case "-10000":
	    		msg = "API 호출중 서버오류가 발생하였습니다.";
	    		break;
	    	case "-10003":
	    		msg = "연동서비스가 점검 중입니다.";
	    		break;
	    	case "-10004":
	    		msg = "해당 기능은 더 이상 사용되지 않습니다.";
	    		break;
	    	case "-10007":
	    		msg = "해당 기능을 사용할 수 없습니다.";
	    		break;
	    	case "-10005":
	    		msg = "최대 100건까지만 사용하실 수 있습니다.";
	    		break;
	    	case "-10006":
	    		msg = "최대 1000건까지만 사용하실 수 있습니다.";
	    		break;
	    	case "-10008":
	    		msg = "날짜형식이 잘못되었습니다.";
	    		break;
	    	case "-10148":
	    		msg = "조회 기간이 잘못되었습니다.";
	    		break;
	    	case "-40001":
	    		msg = "파일을 찾을 수 없습니다.";
	    		break;
	    	case "-40002":
	    		msg = "빈 파일입니다(0byte).";
	    		break;
	    	case "-31100":
	    		msg = "등록된 공동인증서가 없습니다.";
	    		break;
	    	case "-26001":
	    		msg = "발행에 필요한 공동인증서가 등록되어 있지 않습니다.";
	    		break;
	    	case "-26002":
	    		msg = "등록된 공동인증서가 만료일이 지났거나, 전송일 기준 유효하지 않습니다.";
	    		break;
	    	case "-26003":
	    		msg = "등록된 공동인증서의 검증에 실패하였습니다. 재등록하여 주시기 바랍니다.";
	    		break;
	    	case "-11701":
	    		msg = "거래일자가 잘못되었습니다. (TradeDate)";
	    		break;
	    	case "-11702":
	    		msg = "가맹점 사업자번호가 잘못되었습니다. (FranchiseCorpNum)";
	    		break;
	    	case "-11703":
	    		msg = "가맹점 아이디가 잘못되었습니다. (FranchiseMemberID)";
	    		break;
	    	case "-11704":
	    		msg = "가맹점 상호가 잘못되었습니다. (FranchiseCorpName)";
	    		break;
	    	case "-11705":
	    		msg = "가맹점 대표자명이 잘못되었습니다. (FranchiseCEOName)";
	    		break;
	    	case "-11706":
	    		msg = "가맹점 주소가 잘못되었습니다. (FranchiseAddr)";
	    		break;
	    	case "-11707":
	    		msg = "가맹점 전화번호가 잘못되었습니다. (FranchiseTel)";
	    		break;
	    	case "-11708":
	    		msg = "신분확인번호가 잘못되었습니다. (IdentityNum)";
	    		break;
	    	case "-11709":
	    		msg = "거래구분이 잘못되었습니다. (TradeType)";
	    		break;
	    	case "-11710":
	    		msg = "거래용도가 잘못되었습니다. (TradeUsage)";
	    		break;
	    	case "-11711":
	    		msg = "거래방법이 잘못되었습니다. (TradeMethod)";
	    		break;
	    	case "-11712":
	    		msg = "취소사유가 잘못되었습니다. (CancelType)";
	    		break;
	    	case "-11713":
	    		msg = "취소대상 승인번호가 잘못되었습니다. (CancelNTSConfirmNum)";
	    		break;
	    	case "-11714":
	    		msg = "취소대상 거래일자가 잘못되었습니다. (CancelNTSConfirmDate)";
	    		break;
	    	case "-11715":
	    		msg = "공급가액이 잘못되었습니다. (Amount)";
	    		break;
	    	case "-11716":
	    		msg = "부가세가 잘못되었습니다. (Tax)";
	    		break;
	    	case "-11717":
	    		msg = "봉사료가 잘못되었습니다. (ServiceCharge)";
	    		break;
	    	case "-11720":
	    		msg = "공급가액이 취소 가능한 금액보다 큽니다. (CancelAmount)";
	    		break;
	    	case "-11721":
	    		msg = "부가세가 취소 가능한 금액보다 큽니다. (CancelTax)";
	    		break;
	    	case "-11722":
	    		msg = "봉사료가 취소 가능한 금액보다 큽니다. (CancelServiceCharge)";
	    		break;
	    	case "-21008":
	    		msg = "거래일자가 과거/미래인 경우에는 발행하실 수 없습니다.";
	    		break;
	    	case "-11718":
	    		msg = "취소중 알 수 없는 오류가 발생하였습니다.";
	    		break;
	    	case "-31114":
	    		msg = "국세청으로 전송되기 전에는 취소발행하실 수 없습니다.";
	    		break;
	    	case "-11719":
	    		msg = "승인번호 채번에 실패하였습니다.";
	    		break;
	    	case "-31111":
	    		msg = "이메일 전송이 불가능한 상태입니다.";
	    		break;
	    	case "-31112":
	    		msg = "SMS 전송이 불가능한 상태입니다.";
	    		break;
	    	case "-31113":
	    		msg = "FAX 전송이 불가능한 상태입니다.";
	    		break;
	    	case "-11009":
	    		msg = "문서 형태가 잘못되었습니다. (TaxInvoiceType)";
	    		break;
	    	case "-11019":
	    		msg = "계산서 형태가 맞지 않습니다. (TaxInvoiceType, TaxType)";
	    		break;
	    	case "-11010":
	    		msg = "과세형태가 잘못되었습니다. (TaxType)";
	    		break;
	    	case "-11007":
	    		msg = "영수/청구 구분이 잘못되었습니다. (PurposeType)";
	    		break;
	    	case "-11005":
	    		msg = "발행방향이 잘못되었습니다. (IssueDirection)";
	    		break;
	    	case "-24006":
	    		msg = "발행시점이 잘못되었습니다. (IssueTiming)";
	    		break;
	    	case "-11110":
	    		msg = "공급자와 공급받는자의 사업자번호가 같습니다.";
	    		break;
	    	case "-11002":
	    		msg = "공급자 정보가 없습니다. (InvoicerParty)";
	    		break;
	    	case "-11101":
	    		msg = "공급자 사업자번호가 잘못되었습니다. (InvoicerParty.CorpNum)";
	    		break;
	    	case "-11109":
	    		msg = "공급자의 종사업자 번호는 숫자 4자리로 입력해야 합니다. (InvoicerParty.TaxRegID)";
	    		break;
	    	case "-11102":
	    		msg = "공급자 상호가 잘못되었습니다. (InvoicerParty.CorpName)";
	    		break;
	    	case "-11103":
	    		msg = "공급자 대표자명이 잘못되었습니다. (InvoicerParty.CEOName)";
	    		break;
	    	case "-11104":
	    		msg = "공급자 주소가 잘못되었습니다. (InvoicerParty.Addr)";
	    		break;
	    	case "-11105":
	    		msg = "공급자 업종이 잘못되었습니다. (InvoicerParty.BizType)";
	    		break;
	    	case "-11106":
	    		msg = "공급자 업태가 잘못되었습니다. (InvoicerParty.BizClass)";
	    		break;
	    	case "-11001":
	    		msg = "공급자 아이디가 잘못되었습니다. (InvoicerParty.ContactID)";
	    		break;
	    	case "-11107":
	    		msg = "공급자 담당자명이 잘못되었습니다. (InvoicerParty.ContactName)";
	    		break;
	    	case "-11108":
	    		msg = "공급자 이메일이 잘못되었습니다. (InvoicerParty.Email)";
	    		break;
	    	case "-11003":
	    		msg = "공급받는자 정보가 없습니다. (InvoiceeParty)";
	    		break;
	    	case "-11201":
	    		msg = "공급받는자 사업자번호가 잘못되었습니다. (InvoiceeParty.CorpNum)";
	    		break;
	    	case "-11209":
	    		msg = "공급받는자의 종사업자 번호는 숫자 4자리로 입력해야 합니다. (InvoiceeParty.TaxRegID)";
	    		break;
	    	case "-11202":
	    		msg = "공급받는자 상호가 잘못되었습니다. (InvoiceeParty.CorpName)";
	    		break;
	    	case "-11203":
	    		msg = "공급받는자 대표자명이 잘못되었습니다. (InvoiceeParty.CEOName)";
	    		break;
	    	case "-11204":
	    		msg = "공급받는자 주소가 잘못되었습니다. (InvoiceeParty.Addr)";
	    		break;
	    	case "-11205":
	    		msg = "공급받는자 업종이 잘못되었습니다. (InvoiceeParty.BizType)";
	    		break;
	    	case "-11206":
	    		msg = "공급받는자 업태가 잘못되었습니다. (InvoiceeParty.BizClass)";
	    		break;
	    	case "-11017":
	    		msg = "공급받는자 아이디가 잘못되었습니다. (InvoiceeParty.ContactID)";
	    		break;
	    	case "-11207":
	    		msg = "공급받는자 담당자명이 잘못되었습니다. (InvoiceeParty.ContactName)";
	    		break;
	    	case "-11208":
	    		msg = "공급받는자 이메일이 잘못되었습니다. (InvoiceeParty.Email)";
	    		break;
	    	case "-11004":
	    		msg = "위탁자 정보가 없습니다. (BrokerParty)";
	    		break;
	    	case "-25003":
	    		msg = "위탁자 사업자번호가 잘못되었습니다 (BrokerParty.CorpNum).";
	    		break;
	    	case "-11210":
	    		msg = "위탁자의 종사업자 번호는 숫자 4자리로 입력해야 합니다. (BrokerParty.TaxRegID)";
	    		break;
	    	case "-11301":
	    		msg = "수탁자 사업자번호가 잘못되었습니다. (BrokerParty.CorpNum)";
	    		break;
	    	case "-11302":
	    		msg = "수탁자 상호가 잘못되었습니다. (BrokerParty.CorpName)";
	    		break;
	    	case "-11303":
	    		msg = "수탁자 대표자명이 잘못되었습니다. (BrokerParty.CEOName)";
	    		break;
	    	case "-11304":
	    		msg = "수탁자 주소가 잘못되었습니다. (BrokerParty.Addr)";
	    		break;
	    	case "-11014":
	    		msg = "수탁자 아이디가 잘못되었습니다. (BrokerParty.ContactID)";
	    		break;
	    	case "-11307":
	    		msg = "수탁자 담당자명이 잘못되었습니다. (BrokerParty.ContactName)";
	    		break;
	    	case "-11308":
	    		msg = "수탁자 이메일이 잘못되었습니다. (BrokerParty.Email)";
	    		break;
	    	case "-11021":
	    		msg = "공급받는자가 외국인인 경우 비고에 추가정보를 기재하여야 합니다. (Remark1)";
	    		break;
	    	case "-11022":
	    		msg = "작성일자의 형식(YYYYMMDD)이 잘못되었습니다. (WriteDate)";
	    		break;
	    	case "-11020":
	    		msg = "작성일자를 미래일자로 발행하실 수 없습니다. (WriteDate)";
	    		break;
	    	case "-11801":
	    		msg = "권 항목이 잘못되었습니다. 숫자만 가능합니다. (Kwon)";
	    		break;
	    	case "-11802":
	    		msg = "호 항목이 잘못되었습니다. 숫자만 가능합니다. (Ho)";
	    		break;
	    	case "-11006":
	    		msg = "공급가액이 잘못되었습니다. (AmountTotal)";
	    		break;
	    	case "-11016":
	    		msg = "세액이 잘못되었습니다. (TaxTotal)";
	    		break;
	    	case "-11015":
	    		msg = "합계금액이 잘못되었습니다. (TotalAmount)";
	    		break;
	    	case "-11310":
	    		msg = "영세,면세 세금계산서는 세금이 0원이어야 합니다.";
	    		break;
	    	case "-11311":
	    		msg = "과세는 세금이 0원 이상이어야 합니다.";
	    		break;
	    	case "-11803":
	    		msg = "현금 항목이 잘못되었습니다. (Cash)";
	    		break;
	    	case "-11804":
	    		msg = "수표 항목이 잘못되었습니다. (ChkBill)";
	    		break;
	    	case "-11805":
	    		msg = "어음 항목이 잘못되었습니다. (Note)";
	    		break;
	    	case "-11806":
	    		msg = "외상미수금 항목이 잘못되었습니다. (Credit)";
	    		break;
	    	case "-11811":
	    		msg = "현금, 수표, 어음, 외상미수금의 합계가 세금계산서의 합계금액과 맞지 않습니다.";
	    		break;
	    	case "-11309":
	    		msg = "품목정보는 99개까지만 입력할 수 있습니다. (TaxInvoiceTradeLineItems)";
	    		break;
	    	case "-11023":
	    		msg = "품목정보의 공급일자 형식(YYYYMMDD)이 잘못되었습니다. (TaxInvoiceTradeLineItem.PurchaseExpiry)";
	    		break;
	    	case "-11814":
	    		msg = "품목정보의 공급일자의 월은 작성일자의 월과 같아야 합니다. (TaxInvoiceTradeLineItem.PurchaseExpiry)";
	    		break;
	    	case "-11808":
	    		msg = "품목정보의 수량이 유효하지 않습니다. (TaxInvoiceTradeLineItem.ChargeableUnit)";
	    		break;
	    	case "-11809":
	    		msg = "품목정보의 단가가 유효하지 않습니다. (TaxInvoiceTradeLineItem.UnitPrice)";
	    		break;
	    	case "-11807":
	    		msg = "품목정보의 공급가액이 유효하지 않습니다. (TaxInvoiceTradeLineItem.Amount)";
	    		break;
	    	case "-11810":
	    		msg = "품목정보의 세액이 유효하지 않습니다. (TaxInvoiceTradeLineItem.Tax)";
	    		break;
	    	case "-11812":
	    		msg = "품목정보의 공급가액, 세액이 유효하지 않습니다.";
	    		break;
	    	case "-11813":
	    		msg = "영세,면세 세금계산서는 품목정보의 세금이 0원이어야 합니다.";
	    		break;
	    	case "-11321":
	    		msg = "해당 함수는 일반세금계산서를 등록하실 수 없습니다.";
	    		break;
	    	case "-11322":
	    		msg = "당초 국세청승인번호가 입력되지 않았습니다.";
	    		break;
	    	case "-11323":
	    		msg = "당초 국세청승인번호는 바로빌을 통해 등록된 세금계산서의 승인번호만 가능합니다.";
	    		break;
	    	case "-11324":
	    		msg = "공급자의 당초 국세청승인번호가 아닙니다.";
	    		break;
	    	case "-11330":
	    		msg = "일반세금계산서를 수정세금계산서로 수정하실 수 없습니다.";
	    		break;
	    	case "-11331":
	    		msg = "수정세금계산서를 일반세금계산서로 수정하실 수 없습니다.";
	    		break;
	    	case "-11332":
	    		msg = "'과세,영세' 와 '면세' 간에 수정세금계산서를 작성하실 수 없습니다.";
	    		break;
	    	case "-11341":
	    		msg = "환입 또는 계약의해지 시 공급가액과 세액은 (-)이어야 합니다.";
	    		break;
	    	case "-26012":
	    		msg = "해당 세금계산서에 대해 가산세가 예상됩니다.";
	    		break;
	    	case "-26013":
	    		msg = "해당 세금계산서에 대해 과세기간이 종료하였거나, 발행대상이 아닙니다.";
	    		break;
	    	case "-26005":
	    		msg = "해당 세금계산서의 전자서명 과정 중 XML생성에 실패하였습니다.";
	    		break;
	    	case "-31002":
	    		msg = "해당 세금계산서는 국세청 전송이 불가한 상태입니다.";
	    		break;
	    	case "-31004":
	    		msg = "국세청 신고 과정이 진행 중이거나, 완료되었습니다.";
	    		break;
	    	case "-31007":
	    		msg = "해당 세금계산서의 전자서명 정보를 찾을 수 없습니다.";
	    		break;
	    	case "-31008":
	    		msg = "국세청 신고요청 중 알수 없는 오류가 발생하였습니다.";
	    		break;
	    	case "-31009":
	    		msg = "역발행으로 저장된 건이 아닙니다.";
	    		break;

	    	case "-32000":
	    		msg = "이미 가입된 연계사업자 입니다.";
	    		break;
	    	case "-32001":
	    		msg = "사업자번호가 유효하지 않습니다.";
	    		break;
	    	case "-32002":
	    		msg = "회사명이 유효하지 않습니다.";
	    		break;
	    	case "-32003":
	    		msg = "대표자명이 유효하지 않습니다.";
	    		break;
	    	case "-32004":
	    		msg = "업태가 유효하지 않습니다.";
	    		break;
	    	case "-32005":
	    		msg = "업종이 유효하지 않습니다.";
	    		break;
	    	case "-32006":
	    		msg = "주소가 유효하지 않습니다.";
	    		break;
	    	case "-32008":
	    		msg = "담당자명이 유효하지 않습니다.";
	    		break;
	    	case "-32010":
	    		msg = "아이디가 유효하지 않습니다.";
	    		break;
	    	case "-32015":
	    		msg = "해당 아이디는 이미 사용중입니다.";
	    		break;
	    	case "-32011":
	    		msg = "패스워드가 유효하지 않습니다.";
	    		break;
	    	case "-32012":
	    		msg = "연락처가 유효하지 않습니다.";
	    		break;
	    	case "-32013":
	    		msg = "이메일이 유효하지 않습니다.";
	    		break;
	    	case "-32016":
	    		msg = "해당 아이디를 찾을 수 없습니다.";
	    		break;
	    	case "-32017":
	    		msg = "탈퇴한 아이디입니다.";
	    		break;
	    	case "-24011":
	    		msg="문서 DB입력에 실패하였습니다.";
	    		break;
	    	case "-24012":
	    		msg="문서 품목정보 DB입력에 실패하였습니다.";
	    		break;
	    	case "-24013":
	    		msg="문서 속성정보 DB입력에 실패하였습니다.";
	    		break;
	    	case "-34021":
	    		msg="문서 DB수정에 실패하였습니다.";
	    		break;
	    	case "-34022":
	    		msg="문서 품목정보 DB수정에 실패하였습니다.";
	    		break;
	    	case "-34023":
	    		msg="문서 속성정보 DB수정에 실패하였습니다.";
	    		break;
	    	case "-25102":
	    		msg="관리번호(MgtKey)가 잘못되었습니다.";
	    		break;
	    	case "-11013":
	    		msg="관리번호(MgtKey)가 중복되었습니다.";
	    		break;
	    	case "-11011":
	    		msg="공급자 부여 관리번호(MgtKey)가 잘못되었습니다.";
	    		break;
	    	case "-11012":
	    		msg="공급받는자 부여 관리번호(MgtKey)가 잘못되었습니다.";
	    		break;
	    	case "-11018":
	    		msg="수탁자 부여 관리번호(MgtKey)가 잘못되었습니다.";
	    		break;
	    	case "-21002":
	    		msg="해당 문서 정보가 없습니다.";
	    		break;
	    	case "-21003":
	    		msg="해당 문서는 삭제 가능한 상태가 아닙니다.";
	    		break;
	    	case "-21005":
	    		msg="해당 문서는 임시저장상태가 아닙니다.";
	    		break;
	    	case "-21006":
	    		msg="해당 문서는 임시저장상태입니다.";
	    		break;
	    	case "-26000":
	    		msg="해당 문서는 이미 발행되었거나, 임시저장상태가 아니므로 발행이 불가능합니다.";
	    		break;
	    	case "-21007":
	    		msg="해당 문서는 취소 가능한 상태가 아닙니다.";
	    		break;
	    	case "-30000":
	    		msg="지원되지 않는 처리요청입니다. (ProcType)";
	    		break;
	    	case "-30001":
	    		msg="해당 처리요청은 현재 상태에는 처리할 수 없습니다.";
	    		break;
	    	case "-25101":
	    		msg="문서형태가 올바르지 않습니다.";
	    		break;
	    	case "-26009":
	    		msg="처리에 실패하였습니다.";
	    		break;
	    	case "-33000":
	    		msg="첨부할 파일을 찾을 수 없습니다.";
	    		break;
	    	case "-33001":
	    		msg="첨부파일 개수가 제한을 초과하였습니다.";
	    		break;
	    	case "-33002":
	    		msg="일괄인쇄기능은 50건까지만 가능합니다.";
	    		break;
	    	case "-26014":
	    		msg="과금코드를 찾을 수 없습니다.";
	    		break;
	    	case "-26004":
	    		msg="과금에 실패하였습니다.";
	    		break;
	    	case "-26006":
	    		msg="충전잔액이 부족합니다.";
	    		break;
	    	case "-26011":
	    		msg="연동사의 충전잔액이 부족합니다.";
	    		break;
	    	case "-26015":
	    		msg="공급받는자의 충전잔액이 부족합니다.";
	    		break;
			default:
				if(errorCode.indexOf("-") == -1) {
					msg = "";					
				}else {
					msg = errorCode;
				}
				break;
		}

        return msg;
    }

}
