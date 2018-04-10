import '../assets/styles/footer.css'

export default {
  data () {
    return {
      author: 'Xfz'
    }
  },
  render () {
    return (
      <div class="footer">
        <span>Writen by { this.author }</span>
      </div>
    )
  }
}
