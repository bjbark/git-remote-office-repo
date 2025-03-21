package com.baroservice.api.fax;

import java.rmi.RemoteException;

import com.baroservice.api.BarobillApiProfile;
import com.baroservice.api.BarobillApiService;
import com.baroservice.ws.FaxMessage;
import com.baroservice.ws.FaxMessageEx;

/**
 * 바로빌 팩스 API 샘플
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
     * SendFaxFromFTP - 전송 (단일파일)
     */

    public void SendFaxFromFTP(String key,String num,String id, String name, String from , String to , String tocorp , String toname) throws RemoteException {

        String certKey = key;        // 인증키
        String corpNum = num;        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String senderId = id;       // 연계사업자 담당자 아이디
        String fileName = name;       // 전송할 파일명
        String fromNumber = from;     // 발신번호
        String toNumber = to;       // 수신번호
        String toCorpName = tocorp;     // 수신자 회사명
        String toName = toname;         // 수신자명
        String sendDT = "";         // 전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "WSINFOTECH";         // 연동사부여 전송키

        String result = barobillApiService.fax.sendFaxFromFTP(certKey, corpNum, senderId, fileName, fromNumber, toNumber, toCorpName, toName, sendDT, refKey);

        System.out.println("result = "+result);

    }

    /**
     * SendFaxFromFTPEx - 전송 (다량파일)
     */

    public void SendFaxFromFTPEx() throws RemoteException {

        String certKey = "";        //인증키
        String corpNum = "";        //연계사업자 사업자번호 ('-' 제외, 10자리)
        String senderId = "";       //연계사업자 담당자 아이디
        int fileCount = 2;        //전송할 파일수

        String[] fileNames = new String[fileCount];        //전송할 파일명
        fileNames[0] = "";
        fileNames[1] = "";

        String fromNumber = "";        //발신번호
        String toNumber = "";        //수신번호
        String toCorpName = "";        //수신자 회사명
        String toName = "";            //수신자명
        String sendDt = "";            //전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "";            //연동사부여 전송키

        String result = barobillApiService.fax.sendFaxFromFTPEx(certKey, corpNum, senderId, fileCount, fileNames, fromNumber, toNumber, toCorpName, toName, sendDt, refKey);

        System.out.println(result);

    }

    /**
     * SendFaxesFromFTP - 다량전송 (단일파일)
     */

    public void SendFaxesFromFTP() throws RemoteException {

        String certKey = "";        //인증키
        String corpNum = "";        //연계사업자 사업자번호 ('-' 제외, 10자리)
        String senderId = "";       //연계사업자 담당자 아이디
        String fileName = "";       //전송할 파일명
        int sendCount = 2;        //전송건수
        FaxMessage[] messages = new FaxMessage[sendCount];    //팩스 정보
        messages[0] = new FaxMessage();
        messages[0].setSenderNum("");
        messages[0].setReceiverNum("");
        messages[0].setReceiveCorp("");
        messages[0].setReceiverName("");
        messages[1] = new FaxMessage();
        messages[1].setSenderNum("");
        messages[1].setReceiverNum("");
        messages[1].setReceiveCorp("");
        messages[1].setReceiverName("");

        String sendDt = "";         //전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)

        String[] result = barobillApiService.fax.sendFaxesFromFTP(certKey, corpNum, senderId, fileName, sendCount, messages, sendDt);

        System.out.println(result);

    }

    /**
     * SendFaxesFromFTPEx - 다량전송 (다량파일)
     */

    public void SendFaxesFromFTPEx() throws RemoteException {

        String certKey = "";        //인증키
        String corpNum = "";        //연계사업자 사업자번호 ('-' 제외, 10자리)
        String senderId = "";       //연계사업자 담당자 아이디
        int fileCount = 2;        //전송할 파일수

        String[] fileNames = new String[fileCount];            //전송할 파일명
        fileNames[0] = "";
        fileNames[1] = "";

        int sendCount = 2;        //전송건수
        FaxMessage[] messages = new FaxMessage[sendCount];    //팩스 정보
        messages[0] = new FaxMessage();
        messages[0].setSenderNum("");
        messages[0].setReceiverNum("");
        messages[0].setReceiveCorp("");
        messages[0].setReceiverName("");
        messages[1] = new FaxMessage();
        messages[1].setSenderNum("");
        messages[1].setReceiverNum("");
        messages[1].setReceiveCorp("");
        messages[1].setReceiverName("");

        String sendDt = "";         //전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)

        String[] result = barobillApiService.fax.sendFaxesFromFTPEx(certKey, corpNum, senderId, fileCount, fileNames, sendCount, messages, sendDt);

        System.out.println(result);

    }

    /**
     * CancelReservedFaxMessage - 예약 전송취소
     */

    public void CancelReservedFaxMessage() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";            // 바로빌부여 전송키

        int result = barobillApiService.fax.cancelReservedFaxMessage(certKey, corpNum, corpNum);

        System.out.println(result);

    }

    /**
     * GetFaxSendState - 팩스 전송 상태 (바로빌부여 전송키)
     */

    public void GetFaxSendState() throws RemoteException {

        String certKey = "";            //  인증키
        String corpNum = "";         //  바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";         //  바로빌부여 전송키

        int result = barobillApiService.fax.getFaxSendState(certKey, corpNum, sendKey);

        System.out.println(result);

    }

    /**
     * GetFaxMessage - 팩스 확인A (바로빌부여 전송키)
     */

    public void GetFaxMessage() throws RemoteException {

        String certKey = "";        // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";        // 바로빌부여 전송키

        FaxMessage result = barobillApiService.fax.getFaxMessage(certKey, corpNum, sendKey);

        System.out.println(result);

    }

    /**
     * GetFaxMessageEx - 팩스 확인B (바로빌부여 전송키)
     */

    public void GetFaxMessageEx() throws RemoteException {

        String certKey = "";        // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";        // 바로빌부여 전송키

        FaxMessageEx result = barobillApiService.fax.getFaxMessageEx(certKey, corpNum, sendKey);

        System.out.println(result);

    }

    /**
     * GetFaxSendMessages - 팩스 대량확인A (바로빌부여 전송키)
     */

    public void GetFaxSendMessages() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)

        String[] sendKeyList = new String[2];    //바로빌부여 전송키 배열
        sendKeyList[0] = "";
        sendKeyList[1] = "";

        FaxMessage[] result = barobillApiService.fax.getFaxSendMessages(certKey, corpNum, sendKeyList);

        System.out.println(result);

    }

    /**
     * GetFaxSendMessagesEx - 팩스 대량확인B (바로빌부여 전송키)
     */

    public void GetFaxSendMessagesEx() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)

        String[] sendKeyList = new String[2];    //바로빌부여 전송키 배열
        sendKeyList[0] = "";
        sendKeyList[1] = "";

        FaxMessageEx[] result = barobillApiService.fax.getFaxSendMessagesEx(certKey, corpNum, sendKeyList);

        System.out.println(result);

    }

    /**
     * GetFaxSendMessagesByRefKey - 팩스 확인A (연동사부여 전송키)
     */

    public void GetFaxSendMessagesByRefKey() throws RemoteException {

        String certKey = "";        // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String refKey = "";         // 연동사부여 전송키

        FaxMessage[] result = barobillApiService.fax.getFaxSendMessagesByRefKey(certKey, corpNum, refKey);

        System.out.println(result);

    }

    /**
     * GetFaxSendMessagesByRefKeyEx - 팩스 확인B (연동사부여 전송키)
     */

    public void GetFaxSendMessagesByRefKeyEx() throws RemoteException {

        String certKey = "";        // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String refKey = "";         // 연동사부여 전송키

        FaxMessageEx[] result = barobillApiService.fax.getFaxSendMessagesByRefKeyEx(certKey, corpNum, refKey);

        System.out.println(result);

    }

    /**
     * 팩스 전송내역 URL
     */

    public void GetFaxHistoryURL() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";                // 바로빌 회원 아이디
        String pwd = "";                // 바로빌 회원 비밀번호

        String result = barobillApiService.fax.getFaxHistoryURL(certKey, corpNum, id, pwd);

        System.out.println(result);

    }

    /**
     * 팩스 파일 다운로드 URL
     */

    public void GetFaxFileURL() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";            // 바로빌부여 전송키
        int fileType = 1;                // 1:원본파일 2:TIF(변환)파일

        String[] result = barobillApiService.fax.getFaxFileURL(certKey, corpNum, sendKey, fileType);

        System.out.println(result);
    }

}
