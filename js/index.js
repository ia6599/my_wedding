$(function() {
    $(document).ready(function() {
        $("#fullpage").fullpage();
    });
    $('.music-icon').click(function() {
        if ($(this).hasClass('play')) {
            $('.musicCon')[0].play()
            $(this).removeClass('play')
        } else {
            $('.musicCon')[0].pause()
            $(this).addClass('play')
        }
    })
});